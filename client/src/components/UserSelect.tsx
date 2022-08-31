import { Select } from "antd";
import { useUsers } from "../hooks/useUsers";
import { UserModel } from "../models/User.model";
import { Loader } from "./Loader";

type Props = {
  placeholder?: string;
  onChange?: (userId: Pick<UserModel, "id">) => void;
};

export const UserSelect = ({
  placeholder = "Select user",
  onChange,
}: Props) => {
  const { resource, isLoading, error } = useUsers();

  if (isLoading) return <Loader />;

  if (error) return <div>error...</div>;

  if (resource === null) return null;

  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      style={{ minWidth: "10rem" }}
    >
      {resource.users.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.username}
        </Select.Option>
      ))}
    </Select>
  );
};
