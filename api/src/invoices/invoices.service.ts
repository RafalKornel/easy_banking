import { UserModel, usersService } from "../users";
import { InvoicesRepository, invoicesRepository } from "./invoices.repository";
import { AddInvoiceDto } from "./invoices.model";

class InvoicesService {
  constructor(private readonly invoicesRepository: InvoicesRepository) {}

  async getAllInvoices() {
    return this.invoicesRepository.getAllInvoices();
  }

  async getAllInvoicesWithUsers() {
    return this.invoicesRepository.getAllInvoicesWithUsers();
  }

  async getUserInvoices(userId: number) {
    return this.invoicesRepository.getUserInvoices(userId);
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

    const invoiceDate = date || new Date().toISOString();

    const queryResult = this.invoicesRepository.addInvoice(
      ammount,
      title,
      invoice_description,
      invoiceDate,
      recipient,
      user_id,
      hardId
    );

    await usersService.updateBalance(user_id, user.balance + ammount);

    return queryResult;
  }
}

export const invoicesService = new InvoicesService(invoicesRepository);
