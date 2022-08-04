import { db } from "../db";
import { Db } from "../services";
import { RegisterDto, RegisterModel, UserModel } from "./users.model";

class UsersService {
  private readonly db: Db;

  constructor(db: Db) {
    this.db = db;
  }

  async registerUser(user: RegisterDto) {
    const { password, repeatPassword, username } = user;

    const registerModel = new RegisterModel({
      username,
      password,
      repeatPassword,
    });

    return await this.db.query("SELECT * FROM users", []);
  }

  async getUsers() {
    return await this.db.query<UserModel, any>("SELECT * FROM users", []);
  }
}

export const loginService = new UsersService(db);
