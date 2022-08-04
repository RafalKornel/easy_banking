import { useUsers } from "../hooks/useUsers";
import { Loader } from "./Loader";

type Props = {
  error: Error;
};

const ErrorHandler = ({ error }: Props) => (
  <div>
    <div>Ooops.. Something went wrong...</div>
    <div>{error.message}</div>
  </div>
);

export const UsersList = () => {
  const { error, isLoading, users, refetch } = useUsers();

  if (isLoading) return <Loader />;

  if (error) return <ErrorHandler error={error} />;

  return (
    <div>
      <h2>Users:</h2>
      <ul>
        {users?.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <button type="button" onClick={refetch}>
        Refetch
      </button>
    </div>
  );
};
