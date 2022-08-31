import { Select } from "antd";
import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { UserModel } from "../models/User.model";
import { Loader } from "./Loader";

type SelectState = Pick<UserModel, "id"> | undefined;

type Props = {
  placeholder?: string;
  onChange?: (userId: SelectState) => void;
};

export const UserSelect = ({
  placeholder = "Select user",
  onChange,
}: Props) => {
  const [user, setUser] = useState<SelectState>();
  const { resource, isLoading, error } = useUsers();

  const handleChange = (value: SelectState) => {
    setUser(value);
    onChange && onChange(value);
  };

  if (isLoading) return <Loader />;

  if (error) return <div>error...</div>;

  if (resource === null) return null;

  return (
    <Select
      placeholder={placeholder}
      onChange={handleChange}
      value={user}
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
