import { Select } from "antd";
import { useHandleResourceState, useUsers } from "../hooks";
import { UserModel } from "../models/User.model";

const defaultLabelParser = (user: UserModel) => user.username;

type SelectState = UserModel["id"] | undefined;

type Props = {
  placeholder?: string;
  value?: SelectState;
  onChange?: (userId: SelectState) => void;
  labelParser?: (user: UserModel) => string;
};

export const UserSelect = ({
  placeholder = "Select user",
  value,
  onChange,
  labelParser = defaultLabelParser,
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
          {labelParser(user)}
        </Select.Option>
      ))}
    </Select>
  );
};
