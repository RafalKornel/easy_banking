import { db } from "../db";
import { Db } from "../services";
import { getNextId } from "../utils/getNextId";
import { RegisterDto, RegisterModel, UserModel } from "./users.model";

const DEFAULT_BALANCE = 1000;

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

    return await this.db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [
      newUserId,
      registerModel.username,
      registerModel.password,
      DEFAULT_BALANCE,
    ]);
  }

  async getUsers() {
    return await this.db.query<UserModel, any>("SELECT * FROM users", []);
  }

  async getUser(userId: number) {
    return await this.db.query<UserModel, any>(
      "SELECT * \
        FROM users \
        WHERE users.id = $1 ",
      [userId]
    );
  }

  async updateBalance(userId: number, newBalance: number) {
    await this.db.query<UserModel, any>(
      "UPDATE users SET balance = $1 WHERE id = $2;",
      [newBalance, userId]
    );
  }
}

export const usersService = new UsersService(db);
