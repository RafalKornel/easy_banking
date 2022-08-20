import { db } from "../db";
import { Db } from "../services";
import { getNextId } from "../utils/getNextId";
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

    const existingUsers = await this.getUsers();

    const isUserRegistered = existingUsers.rows.find(
      (user) => user.username === registerModel.username
    );

    if (isUserRegistered) {
      throw new Error("User already registered");
    }

    const newUserId = getNextId(existingUsers);

    return await this.db.query("INSERT INTO users VALUES ($1, $2, $3)", [
      newUserId,
      registerModel.username,
      registerModel.password,
    ]);
  }

  async getUsers() {
    return await this.db.query<UserModel, any>("SELECT * FROM users", []);
  }
}

export const usersService = new UsersService(db);
