import { usersService, UserModel } from "../users";
import {
  TransfersRepository,
  transfersRepository,
} from "./transfers.repository";
import { AddTransferDto } from "./transfers.model";

class TransfersService {
  constructor(private readonly transfersRepository: TransfersRepository) {}

  async getAllTransfers() {
    return this.transfersRepository.getAllTransfers();
  }

  async getAllTransfersWithUsers() {
    return this.transfersRepository.getAllTransfersWithUsers();
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

    const transferDate = date || new Date().toISOString();

    return this.transfersRepository.addTransfer(
      ammount,
      title,
      description,
      transferDate,
      sender_id,
      recipient_id,
      hardId
    );
  }
}

export const transfersService = new TransfersService(transfersRepository);
