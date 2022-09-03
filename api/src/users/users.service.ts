import { db } from "../db";
import { EntityService } from "../services";
import { getNextId } from "../utils/getNextId";
import { RegisterDto, RegisterModel, UserModel } from "./users.model";

const DEFAULT_BALANCE = 1000;

class UsersService extends EntityService {
  async create() {
    const CREATE_USERS_SQL = `
    CREATE TABLE users (
      id INT PRIMARY KEY,
      username VARCHAR NOT NULL,
      password VARCHAR NOT NULL,
      balance INT NOT NULL
    )`;

    return await this.db.query(CREATE_USERS_SQL, []);
  }

  async drop() {
    const DROP_USERS_SQL = "DROP TABLE IF EXISTS users CASCADE";

    return await this.db.query(DROP_USERS_SQL, []);
  }

  async registerUser(user: RegisterDto, hardId?: number) {
    const { password, repeatPassword, username, startingBalance } = user;

    const registerModel = new RegisterModel({
      username,
      password,
      repeatPassword,
      startingBalance,
    });

    const existingUsers = await this.getUsers();

    const isUserRegistered = existingUsers.rows.find(
      (user) => user.username === registerModel.username
    );

    if (isUserRegistered) {
      throw new Error("User already registered");
    }

    const newUserId = hardId || getNextId(existingUsers);

    return await this.db.query("INSERT INTO users VALUES ($1, $2, $3, $4)", [
      newUserId,
      registerModel.username,
      registerModel.password,
      registerModel.startingBalance || DEFAULT_BALANCE,
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
