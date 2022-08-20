import { Request, Response, Application } from "express";
import { ResponseHandler } from "../ResponseHandler";
import { RegisterDto, UserModel } from "./users.model";
import { usersService } from "./users.service";

export const registerUsersRoutes = (app: Application) => {
  app.post(
    "/register",
    async (req: Request<any, any, RegisterDto>, res: Response) => {
      try {
        await usersService.registerUser(req.body);
        ResponseHandler.handleSuccess(res);
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );

  app.get(
    "/users",
    async (req: Request, res: Response<{ users: UserModel[] }>) => {
      try {
        const dbRes = await usersService.getUsers();

        ResponseHandler.handleSuccess(res, { users: dbRes.rows });
      } catch (e) {
        ResponseHandler.handleInternalError(res, (e as Error).message);
      }
    }
  );
};
