import { db } from "../db";
import { Db } from "../services";
import { usersService } from "../users";
import { UserModel } from "../users/users.model";
import { getNextId } from "../utils/getNextId";
import {
  AddTransactionDto,
  TransactionModel,
  TransactionWithUsersModel,
} from "./transactions.model";

class TransactionsService {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async getAllTransactions() {
    return await this.db.query<TransactionModel, any>(
      "SELECT * FROM transactions",
      []
    );
  }

  // SELECT table1.column1, table2.column2...
  // FROM table1
  // INNER JOIN table2
  // ON table1.common_filed = table2.common_field;

  async getAllTransactionsWithUsers() {
    return await this.db.query<TransactionWithUsersModel[], any>(
      "SELECT \
        transactions.id, \
        ammount, \
        recipient_id, \
        sender_id, \
        title, \
        transaction_date, \
        transaction_description, \
        user1.username as recipient_username, \
        user2.username as sender_username \
      FROM transactions \
        JOIN users as user1 on transactions.recipient_id = user1.id \
        JOIN users as user2 on transactions.sender_id = user2.id;",
      []
    );
  }

  canPerformTransaction(user: UserModel, ammount: number) {
    return user.balance >= ammount;
  }

  async addTransaction(transaction: AddTransactionDto) {
    const { ammount, recipient_id, sender_id, title, description } =
      transaction;

    const users = await usersService.getUsers();

    const sender = users.rows.find(({ id }) => id === sender_id);
    const recipient = users.rows.find(({ id }) => id === recipient_id);

    if (!sender || !recipient) {
      throw new Error("Couldn't find user");
    }

    if (!this.canPerformTransaction(sender, ammount)) {
      throw new Error("User doesn't have sufficient ammount");
    }

    await usersService.updateBalance(sender_id, sender.balance - ammount);
    await usersService.updateBalance(recipient_id, recipient.balance + ammount);

    const transactions = await this.getAllTransactions();

    const nextId = getNextId(transactions);

    const transactionDate = new Date().toISOString();

    await this.db.query(
      "INSERT INTO transactions VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        nextId,
        ammount,
        title,
        description,
        transactionDate,
        sender_id,
        recipient_id,
      ]
    );
  }
}

export const transactionService = new TransactionsService(db);
