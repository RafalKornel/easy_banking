import { UserModel } from "../models/User.model";
import { API } from "../services/api";
import { useResource } from "./useResource";

type UsersResponse = { users: UserModel[] };

const getResource = () => API.get<UsersResponse>("users");

export const useUsers = () => {
  return useResource(getResource);
};
