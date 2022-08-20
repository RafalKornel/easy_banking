import { Select } from "antd";
import { useUsers } from "../hooks/useUsers";
import { UserModel } from "../models/User.model";
import { Loader } from "./Loader";

type Props = {
  onChange?: (userId: Pick<UserModel, "id">) => void;
};

export const UserSelect = ({ onChange }: Props) => {
  const { users, isLoading, error } = useUsers();

  if (isLoading) return <Loader />;

  if (error) return <div>error...</div>;

  if (users === null) return null;

  return (
    <Select placeholder="Select user..." onChange={onChange}>
      {users.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.username}
        </Select.Option>
      ))}
    </Select>
  );
};
