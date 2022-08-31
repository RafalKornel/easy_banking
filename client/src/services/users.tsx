import { UserModel } from "../models/User.model";
import { API } from "./api";

export interface RegisterUserDto {
  username: string;
  password: string;
  repeatPassword: string;
}

export const registerUser = async ({
  password,
  repeatPassword,
  username,
}: RegisterUserDto) => {
  const body = {
    username,
    password,
    repeatPassword,
  };

  const response = await API.post<RegisterUserDto>("register", body);

  return response;
};

export const getAllUsers = async () => {
  const response = await API.get<UserModel[]>("users");

  return response;
};
