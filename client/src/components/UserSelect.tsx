import { Select } from "antd";
import { useHandleResourceState, useUsers } from "../hooks";
import { UserModel } from "../models/User.model";

type SelectState = UserModel["id"] | undefined;

type Props = {
  placeholder?: string;
  value?: SelectState;
  onChange?: (userId: SelectState) => void;
};

export const UserSelect = ({
  placeholder = "Select user",
  value,
  onChange,
}: Props) => {
  const { resource, isLoading, error } = useUsers();

  useHandleResourceState({ error, isLoading, resource });

  return (
    <Select
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      style={{ minWidth: "10rem" }}
    >
      {resource?.users.map((user) => (
        <Select.Option key={user.id} value={user.id}>
          {user.username}
        </Select.Option>
      ))}
    </Select>
  );
};
