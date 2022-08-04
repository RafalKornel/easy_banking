import { useEffect, useState } from "react";
import { UserModel } from "../models/User.model";
import { API } from "../services/api";

type UsersResponse = { users: UserModel[] };

export const useUsers = () => {
  const [users, setUsers] = useState<UserModel[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  console.log({ users, isLoading, error });

  const fetchData = () =>
    API.get<UsersResponse>("users")
      .then((response) => setUsers(response.data.data.users))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));

  const refetch = () => {
    setUsers(null);
    setError(null);
    setIsLoading(true);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { users, isLoading, error, refetch };
};
