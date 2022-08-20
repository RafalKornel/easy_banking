import { UserModel } from "../users/users.model";

export interface AddTransactionDto {
  ammount: number;
  title: string;
  description?: string;
  sender_id: number;
  recipient_id: number;
}

export interface TransactionWithUsersModel extends TransactionModel {
  recipient_username: string;
  sender_username: string;
}

export interface TransactionDto extends TransactionWithUsersModel {}

export interface TransactionModel {
  id: number;
  ammount: number;
  title: string;
  transaction_description?: string;
  transaction_date: string;
  sender_id: number;
  recipient_ud: number;
}
