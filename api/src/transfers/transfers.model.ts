export interface AddTransferDto {
  ammount: number;
  title: string;
  description?: string;
  sender_id: number;
  recipient_id: number;
}

export interface TransferWithUsersModel extends TransferModel {
  recipient_username: string;
  sender_username: string;
}

export interface TransferDto extends TransferWithUsersModel {}

export interface TransferModel {
  id: number;
  ammount: number;
  title: string;
  transfer_description?: string;
  transfer_date: string;
  sender_id: number;
  recipient_ud: number;
}
