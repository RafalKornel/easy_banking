import { db, Db } from "../services";
import { LoginDto, LoginModel } from "./login.model";

class LoginService extends Db {
  async createUser(user: LoginModel) {
    this.db(user);
  }
}

export const loginService = new LoginService();
