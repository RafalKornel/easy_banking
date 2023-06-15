import { db } from "../db";
import { BaseRepository } from "../services";
import { usersService, UserModel } from "../users";
import { getNextId } from "../utils/getNextId";
import {
  AddTransferDto,
  TransferModel,
  TransferWithUsersModel,
} from "./transfers.model";

class TransfersService extends BaseRepository {
  async create() {
    const CREATE_TRANSFERS_SQL = `
    CREATE TABLE transfers (
      id INT PRIMARY KEY,
      ammount INT NOT NULL,
      title VARCHAR NOT NULL,
      transfer_description VARCHAR,
      transfer_date VARCHAR NOT NULL,
      sender_id INT NOT NULL,
      CONSTRAINT fk_sender FOREIGN KEY(sender_id) REFERENCES users(id),
      recipient_id INT NOT NULL,
      CONSTRAINT fk_recipient FOREIGN KEY(recipient_id) REFERENCES users(id)
    )`;

    return await this.db.query(CREATE_TRANSFERS_SQL, []);
  }

  async drop() {
    const DROP_TRANSFERS_SQL = "DROP TABLE IF EXISTS transfers CASCADE";

    return await this.db.query(DROP_TRANSFERS_SQL, []);
  }

  async getAllTransfers() {
    const GET_ALL_TRANSFERS_SQL = "SELECT * FROM transfers";

    return await this.db.query<TransferModel, any>(GET_ALL_TRANSFERS_SQL, []);
  }

  async getAllTransfersWithUsers() {
    const GET_ALL_TRANSFERS_WITH_USERS_SQL = `
    SELECT 
      transfers.id,
      ammount,
      recipient_id,
      sender_id,
      title,
      transfer_date,
      transfer_description,
      user1.username as recipient_username,
      user2.username as sender_username
    FROM transfers
      JOIN users as user1 on transfers.recipient_id = user1.id
      JOIN users as user2 on transfers.sender_id = user2.id;`;

    return await this.db.query<TransferWithUsersModel[], any>(
      GET_ALL_TRANSFERS_WITH_USERS_SQL,
      []
    );
  }

  canPerformTransfer(user: UserModel, ammount: number) {
    return user.balance >= ammount;
  }

  async addTransfer(transfer: AddTransferDto, hardId?: number) {
    const { ammount, recipient_id, sender_id, title, description, date } =
      transfer;

    const users = await usersService.getUsers();

    const sender = users.rows.find(({ id }) => id === sender_id);
    const recipient = users.rows.find(({ id }) => id === recipient_id);

    if (!sender || !recipient) {
      throw new Error("Couldn't find user");
    }

    if (!this.canPerformTransfer(sender, ammount)) {
      throw new Error("User doesn't have sufficient ammount for transfer");
    }

    await usersService.updateBalance(sender_id, sender.balance - ammount);
    await usersService.updateBalance(recipient_id, recipient.balance + ammount);

    const transfers = await this.getAllTransfers();

    const nextId = hardId || getNextId(transfers);

    const transferDate = date || new Date().toISOString();

    return await this.db.query(
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
