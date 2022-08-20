import { Application, Request, Response } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { usersService } from "../users";
import {
  AddTransactionDto,
  TransactionDto,
  TransactionModel,
  TransactionWithUsersModel,
} from "./transactions.model";
import { transactionService } from "./transactions.service";

export const registerTransactionRoutes = (app: Application) => {
  app.post(
    "/transactions",
    async (req: Request<any, any, AddTransactionDto>, res: Response) => {
      try {
        await transactionService.addTransaction(req.body);
        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );

  app.get(
    "/transactions",
    async (
      req: Request,
      res: Response<{ transactions: TransactionWithUsersModel[] }>
    ) => {
      try {
        const transactions =
          await transactionService.getAllTransactionsWithUsers();

        ResponseHandler.handleSuccess(res, { transactions: transactions.rows });
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );
};
