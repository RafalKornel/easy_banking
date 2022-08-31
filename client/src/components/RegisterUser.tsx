import { Form, Input } from "antd";
import { registerUser, RegisterUserDto } from "../services/users";
import { formLayout } from "../styles";

enum Fields {
  username = "username",
  passord = "password",
  repeatPassword = "repeatPassword",
}

export const RegisterUserForm = () => {
  const handleSubmit = (userData: RegisterUserDto) => {
    registerUser(userData);
  };

  return (
    <Form onFinish={handleSubmit} {...formLayout}>
      <Form.Item
        label="Username"
        name={Fields.username}
        rules={[{ required: true }]}
      >
        <Input type="text" placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Password"
        name={Fields.username}
        rules={[{ required: true }]}
      >
        <Input type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item
        label="Repeat password"
        name={Fields.username}
        rules={[{ required: true }]}
      >
        <Input type="password" placeholder="Repeat password" />
      </Form.Item>
    </Form>
  );
};
