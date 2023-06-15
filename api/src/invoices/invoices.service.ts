import { db } from "../db";
import { BaseRepository } from "../services";
import { UserModel, usersService } from "../users";
import { getNextId } from "../utils/getNextId";
import { AddInvoiceDto, InvoiceDto, InvoiceModel } from "./invoices.model";

class InvoicesService extends BaseRepository {
  async create() {
    const CREATE_INVOICES_SQL = `
    CREATE TABLE invoices (
      id INT PRIMARY KEY,
      ammount INT NOT NULL,
      title VARCHAR NOT NULL,
      invoice_description VARCHAR,
      invoice_date VARCHAR NOT NULL,
      recipient VARCHAR NOT NULL,
      user_id INT NOT NULL,
      CONSTRAINT fk_user_id FOREIGN KEY(user_id) REFERENCES users(id)
    );`;

    return await this.db.query(CREATE_INVOICES_SQL, []);
  }

  async drop() {
    const DROP_INVOICES_SQL = "DROP TABLE IF EXISTS invoices CASCADE";

    return await this.db.query(DROP_INVOICES_SQL, []);
  }

  async getAllInvoices() {
    return await this.db.query<InvoiceModel, any>("SELECT * FROM invoices", []);
  }

  async getAllInvoicesWithUsers() {
    return await this.db.query<InvoiceModel, any>(
      "\
    SELECT invoices.id, \
      ammount, \
      invoice_description, \
      invoice_date, \
      title, \
      recipient, \
      user1.id as user_id, \
      user1.username as username \
    FROM invoices \
      JOIN users as user1 on invoices.user_id = user1.id \
        ",
      []
    );
  }

  async getUserInvoices(userId: number) {
    return await this.db.query<InvoiceDto, any>(
      "\
    SELECT invoices.id, \
      ammount, \
      invoice_description, \
      invoice_date, \
      title, \
      recipient, \
      user1.id as user_id, \
      user1.username as username \
    FROM invoices \
      JOIN users as user1 on invoices.user_id = user1.id \
      WHERE user1.id = $1 \
      ",
      [userId]
    );
  }

  canAffordInvoice(user: UserModel, ammount: number) {
    return user.balance >= ammount;
  }

  async addInvoice(invoice: AddInvoiceDto, hardId?: number) {
    const { ammount, title, user_id, invoice_description, recipient, date } =
      invoice;

    const dbResult = await usersService.getUser(user_id);

    const user = dbResult.rows[0];

    if (!user) {
      throw new Error("Couldn't find user");
    }

    if (!this.canAffordInvoice(user, ammount)) {
      throw new Error("User doesn't have sufficient ammount for invoice");
    }

    const invoices = await this.getAllInvoices();

    const nextId = hardId || getNextId(invoices);

    const invoiceDate = date || new Date().toISOString();

    const queryResult = await this.db.query(
      "INSERT INTO invoices VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        nextId,
        ammount,
        title,
        invoice_description,
        invoiceDate,
        recipient,
        user_id,
      ]
    );

    await usersService.updateBalance(user_id, user.balance + ammount);

    return queryResult;
  }
}

export const invoicesService = new InvoicesService(db);
