import { AddInvoiceDto } from "../invoices/invoices.model";
import { invoicesService } from "../invoices/invoices.service";
import { transfersService } from "../transfers/transfers.service";
import { RegisterDto, usersService } from "../users";
import { EntityService } from "../services/entity.service";
import { faker } from "@faker-js/faker";
import { AddTransferDto } from "../transfers/transfers.model";

export class SeederService {
  async dropAllTables() {
    await transfersService.drop();
    await invoicesService.drop();
    await usersService.drop();
  }

  async createAllTables() {
    await usersService.create();
    await transfersService.create();
    await invoicesService.create();
  }

  async seedAll() {
    console.log("Starting seeder...");

    await this.dropAllTables();
    await this.createAllTables();

    await this.seedUsers().catch((e: Error) =>
      console.error(`Failed seeding users: ${e.message}`)
    );
    console.log("Successfully seeded users!");

    await this.seedTransfers().catch((e: Error) =>
      console.error(`Failed seeding transfers: ${e.message}`)
    );
    console.log("Successfully seeded transfers!");

    await this.seedInvoices().catch((e: Error) =>
      console.error(`Failed seeding invoices: ${e.message}`)
    );
    console.log("Successfully seeded invoices!");
  }

  generateUser(): RegisterDto {
    const password = faker.internet.password(10);

    return {
      username: faker.name.fullName(),
      password,
      repeatPassword: password,
      startingBalance: Number(faker.finance.amount(500, 3000, 0)),
    };
  }

  generateInvoice(userId: number): AddInvoiceDto {
    const isIncome = Number(faker.mersenne.rand(10)) > 8;

    const ammount = isIncome
      ? Number(faker.finance.amount(500, 1200, 0))
      : -1 * Number(faker.finance.amount(10, 200, 0));

    return {
      ammount,
      recipient: faker.company.name(),
      title: faker.commerce.productName(),
      invoice_description: faker.finance.transactionDescription(),
      user_id: userId,
      date: faker.date.past(4).toISOString(),
    };
  }

  generateTransfer(senderId: number, recipientId: number): AddTransferDto {
    const description = `${faker.word.noun()} ${faker.word.verb()}`;

    return {
      recipient_id: recipientId,
      sender_id: senderId,
      ammount: Number(faker.finance.amount(0, 200, 0)),
      title: faker.finance.transactionType(),
      description,
      date: faker.date.past().toISOString(),
    };
  }

  async seedUsers(count = 7) {
    const generateUserPromises = Array(count)
      .fill(0)
      .map((_, i) => {
        const user = this.generateUser();
        return usersService.registerUser(user, i + 1).catch((e) => {});
      });

    await Promise.all(generateUserPromises);
  }

  async seedInvoices(avgPerUser = 2000, deviation = 500) {
    const users = await usersService.getUsers();

    const invoicesPromises = users.rows.map((user) => {
      const invoicesCount = avgPerUser + faker.mersenne.rand(deviation);
      const invoices = Array(invoicesCount)
        .fill(0)
        .map((_, i) => this.generateInvoice(user.id));

      const createInvoicePromises = invoices.map((invoice, i) =>
        invoicesService
          .addInvoice(invoice, user.id * 10000 + i + 1)
          .catch((e) => {})
      );

      return createInvoicePromises;
    });

    await Promise.all(invoicesPromises.flat());
  }

  async seedTransfers(avgPerUser = 50, deviation = 5) {
    const users = await usersService.getUsers();

    const transfersPromises = users.rows.map((user) => {
      const otherUsers = users.rows.filter(({ id }) => id !== user.id);

      const otherUsersIds = otherUsers.map(({ id }) => id);

      const transfersCount = avgPerUser + faker.mersenne.rand(deviation);
      const transfers = Array(transfersCount)
        .fill(0)
        .map((_, i) =>
          this.generateTransfer(
            user.id,
            otherUsersIds[Math.floor(Math.random() * otherUsersIds.length)]
          )
        );

      const createTransferPromises = transfers.map((transfer, i) =>
        transfersService.addTransfer(transfer, user.id * 1000 + i + 1)
      );

      return createTransferPromises;
    });

    await Promise.all(transfersPromises.flat());
  }
}

export const seederService = new SeederService();
