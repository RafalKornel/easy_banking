import { UserModel } from "../users/users.model";

export interface InvoiceModel {
  id: number;
  ammount: number;
  title: string;
  invoice_description?: string;
  invoice_date: string;
  user_id: number;
}

export interface InvoiceDto extends InvoiceModel {
  username: UserModel["username"];
}

export interface AddInvoiceDto extends Omit<InvoiceModel, "id"> {}
