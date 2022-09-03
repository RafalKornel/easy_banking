import { db } from "../db";
import { Db } from "../services";
import { UserModel, usersService } from "../users";
import { getNextId } from "../utils/getNextId";
import { AddInvoiceDto, InvoiceDto, InvoiceModel } from "./invoices.model";

class InvoicesService {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
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

  async addInvoice(invoice: AddInvoiceDto) {
    const { ammount, title, user_id, invoice_description } = invoice;

    const dbResult = await usersService.getUser(user_id);

    const user = dbResult.rows[0];

    if (!user) {
      throw new Error("Couldn't find user");
    }

    if (!this.canAffordInvoice(user, ammount)) {
      throw new Error("User doesn't have sufficient ammount for invoice");
    }

    await usersService.updateBalance(user_id, user.balance + ammount);

    const invoices = await this.getAllInvoices();

    const nextId = getNextId(invoices);

    const invoiceDate = new Date().toISOString();

    return await this.db.query(
      "INSERT INTO invoices VALUES ($1, $2, $3, $4, $5, $6)",
      [nextId, ammount, title, invoice_description, invoiceDate, user_id]
    );
  }
}

export const invoicesService = new InvoicesService(db);
