import { Button, Form, Input, Typography } from "antd";
import { registerUser, RegisterUserDto } from "../services/users";
import { defaultFormStyling } from "../styles";
import { Flex } from "./Flex";

enum Fields {
  username = "username",
  password = "password",
  repeatPassword = "repeatPassword",
}

export const RegisterUserForm = () => {
  const handleSubmit = (userData: RegisterUserDto) => {
    registerUser(userData);
  };

  return (
    <Flex>
      <Typography.Title level={4} style={{ marginLeft: `${(10 / 24) * 100}%` }}>
        Register new user
      </Typography.Title>
      <Form
        onFinish={handleSubmit}
        style={{ ...defaultFormStyling, minWidth: "30rem" }}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Username"
          name={Fields.username}
          rules={[{ required: true }]}
        >
          <Input type="text" placeholder="Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name={Fields.password}
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item
          label="Repeat password"
          name={Fields.repeatPassword}
          rules={[{ required: true }]}
        >
          <Input type="password" placeholder="Repeat password" />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 10, offset: 10 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
