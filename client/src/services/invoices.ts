import { UserModel } from "../models/User.model";
import { API } from "./api";

export interface AddInvoiceDto {
  ammount: number;
  title: string;
  invoice_description?: string;
  recipient: string;
  user_id: number;
}

export interface InvoiceDto {
  id: number;
  ammount: number;
  title: string;
  recipient: string;
  invoice_description?: string;
  invoice_date: string;
  user_id: number;
  username: UserModel["username"];
}

interface GetInvoicesResponse {
  invoices: InvoiceDto[];
}

export const getAllInvoices = async () => {
  const response = await API.get<GetInvoicesResponse>("invoices");

  return response;
};

export const addInvoice = async (invoice: AddInvoiceDto) => {
  const response = await API.post<AddInvoiceDto>("invoices", invoice);

  return response;
};
