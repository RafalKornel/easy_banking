import { UserModel } from "../models/User.model";
import { API } from "./api";

interface RegisterRequest {
  username: string;
  password: string;
  repeatPassword: string;
}

export const registerUser = async (
  username: string,
  password: string,
  repeatPassword: string
) => {
  const body = {
    username,
    password,
    repeatPassword,
  };

  const response = await API.post<RegisterRequest>("register", body);

  return response;
};

export const getAllUsers = async () => {
  const response = await API.get<UserModel[]>("users");

  return response;
};
