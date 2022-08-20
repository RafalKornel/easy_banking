import { API } from "./api";

export interface AddTransactionDto {
  ammount: number;
  title: string;
  description?: string;
  sender_id: number;
  recipient_id: number;
}

export interface TransactionDto {
  id: number;
  ammount: number;
  title: string;
  transaction_description?: string;
  transaction_date: string;
  sender_id: number;
  sender_username: string;
  recipient_id: number;
  recipient_username: string;
}

export const addTransaction = async (transaction: AddTransactionDto) => {
  const response = await API.post<AddTransactionDto>(
    "transactions",
    transaction
  );

  return response;
};

export const getAllTransactions = async () => {
  const response = await API.get<TransactionDto>("transactions");

  return response;
};
