import { API } from "./api";

export interface AddTransferDto {
  ammount: number;
  title: string;
  description?: string;
  sender_id: number;
  recipient_id: number;
}

export interface TransferDto {
  id: number;
  ammount: number;
  title: string;
  transfer_description?: string;
  transfer_date: string;
  sender_id: number;
  sender_username: string;
  recipient_id: number;
  recipient_username: string;
}

export const addTransfer = async (transfer: AddTransferDto) => {
  const response = await API.post<AddTransferDto>("transfers", transfer);

  return response;
};

export const getAllTransfers = async () => {
  const response = await API.get<{ transfers: TransferDto[] }>("transfers");

  return response;
};
