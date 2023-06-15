import { db } from "../../db";
import { BaseRepository } from "../../services";
import { getNextId } from "../../utils/getNextId";
import { InvoiceDto, InvoiceModel } from "./invoices.model";

class InvoicesRepository extends BaseRepository {
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

  async addInvoice(
    ammount: number,
    title: string,
    invoice_description: string | undefined,
    invoiceDate: string,
    recipient: string,
    user_id: number,
    hardId?: number
  ) {
    const invoices = await this.getAllInvoices();

    const nextId = hardId || getNextId(invoices);

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

    return queryResult;
  }
}

export type { InvoicesRepository };

export const invoicesRepository = new InvoicesRepository(db);
