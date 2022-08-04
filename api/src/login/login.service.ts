import { Db } from "../services";
import { RegisterDto, RegisterModel } from "./login.model";

class LoginService extends Db {
  async registerUser(user: RegisterDto) {
    const { password, repeatPassword, username } = user;

    const registerModel = new RegisterModel({
      username,
      password,
      repeatPassword,
    });

    return await this.db(registerModel);
  }
}

export const loginService = new LoginService();
