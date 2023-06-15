import { userRepository, UserRepository } from "./users.repository";
import { RegisterDto, RegisterModel } from "./users.model";

const DEFAULT_BALANCE = 1000;

class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create() {
    return this.userRepository.create();
  }

  async drop() {
    return this.userRepository.drop();
  }

  async registerUser(user: RegisterDto, hardId?: number) {
    const { password, repeatPassword, username, startingBalance } = user;

    const registerModel = new RegisterModel({
      username,
      password,
      repeatPassword,
      startingBalance,
    });

    const existingUsers = await this.userRepository.getUsers();

    const isUserRegistered = existingUsers.rows.find(
      (user) => user.username === registerModel.username
    );

    if (isUserRegistered) {
      throw new Error("User already registered");
    }

    return await this.userRepository.registerUser(
      registerModel.username,
      registerModel.password,
      registerModel.startingBalance || DEFAULT_BALANCE,
      hardId
    );
  }

  async getUsers() {
    return this.userRepository.getUsers();
  }

  async getUser(userId: number) {
    return this.userRepository.getUser(userId);
  }

  async updateBalance(userId: number, newBalance: number) {
    return this.userRepository.updateBalance(userId, newBalance);
  }
}

export const usersService = new UsersService(userRepository);
