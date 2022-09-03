import { db } from "../db";
import { Db } from "../services";
import { usersService } from "../users";
import { UserModel } from "../users/users.model";
import { getNextId } from "../utils/getNextId";
import {
  AddTransferDto,
  TransferModel,
  TransferWithUsersModel,
} from "./transfers.model";

class TransfersService {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAllTransfers() {
    return await this.db.query<TransferModel, any>(
      "SELECT * FROM transfers",
      []
    );
  }

  // SELECT table1.column1, table2.column2...
  // FROM table1
  // INNER JOIN table2
  // ON table1.common_filed = table2.common_field;

  async getAllTransfersWithUsers() {
    return await this.db.query<TransferWithUsersModel[], any>(
      "SELECT \
        transfers.id, \
        ammount, \
        recipient_id, \
        sender_id, \
        title, \
        transfer_date, \
        transfer_description, \
        user1.username as recipient_username, \
        user2.username as sender_username \
      FROM transfers \
        JOIN users as user1 on transfers.recipient_id = user1.id \
        JOIN users as user2 on transfers.sender_id = user2.id;",
      []
    );
  }

  canPerformTransfer(user: UserModel, ammount: number) {
    return user.balance >= ammount;
  }

  async addTransfer(transfer: AddTransferDto) {
    const { ammount, recipient_id, sender_id, title, description } = transfer;

    const users = await usersService.getUsers();

    const sender = users.rows.find(({ id }) => id === sender_id);
    const recipient = users.rows.find(({ id }) => id === recipient_id);

    if (!sender || !recipient) {
      throw new Error("Couldn't find user");
    }

    if (!this.canPerformTransfer(sender, ammount)) {
      throw new Error("User doesn't have sufficient ammount");
    }

    await usersService.updateBalance(sender_id, sender.balance - ammount);
    await usersService.updateBalance(recipient_id, recipient.balance + ammount);

    const transfers = await this.getAllTransfers();

    const nextId = getNextId(transfers);

    const transferDate = new Date().toISOString();

    await this.db.query(
      "INSERT INTO transfers VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        nextId,
        ammount,
        title,
        description,
        transferDate,
        sender_id,
        recipient_id,
      ]
    );
  }
}

export const transfersService = new TransfersService(db);
