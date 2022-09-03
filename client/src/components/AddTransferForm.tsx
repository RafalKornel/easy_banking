import { Button, Form, Input, InputNumber, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

import { addTransfer, AddTransferDto } from "../services/transfers";
import { defaultFormStyling } from "../styles";
import { UserSelect } from "./UserSelect";
import { Flex } from "./Flex";
import { useMutationWithToast } from "../hooks";
import { UserModel } from "../models/User.model";

const userLabelParserWithBalance = (user: UserModel) =>
  `${user.username} (${user.balance}$)`;

enum Fields {
  senderId = "sender_id",
  recipeintId = "recipient_id",
  ammount = "ammount",
  title = "title",
  description = "description",
}

export const AddTransferForm = () => {
  const [form] = useForm<AddTransferDto>();

  const handleSubmit = (values: AddTransferDto) => addTransfer(values);

  const handleSubmitWithMutation = useMutationWithToast(handleSubmit, {
    loading: "Creating new transfer...",
    success: "Successfully transfered money!",
  });

  return (
    <Flex
      additionalStyling={{
        margin: "2rem",
        marginRight: "auto",
        minWidth: "40rem",
      }}
    >
      <Typography.Title level={3} style={{ marginLeft: "33%" }}>
        Create new transfer
      </Typography.Title>
      <Form
        style={defaultFormStyling}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={handleSubmitWithMutation}
      >
        <Form.Item
          label="Sender"
          name={Fields.senderId}
          rules={[{ required: true }]}
        >
          <UserSelect
            labelParser={userLabelParserWithBalance}
            placeholder="Select sender"
            onChange={(userId) => form.setFieldValue(Fields.senderId, userId)}
          />
        </Form.Item>

        <Form.Item
          label="Recipient"
          name={Fields.recipeintId}
          rules={[{ required: true }]}
        >
          <UserSelect
            labelParser={userLabelParserWithBalance}
            placeholder="Select recipient"
            onChange={(userId) =>
              form.setFieldValue(Fields.recipeintId, userId)
            }
          />
        </Form.Item>

        <Form.Item
          label="Ammount"
          name={Fields.ammount}
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber placeholder="Ammount..." style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Title"
          name={Fields.title}
          rules={[{ required: true }]}
        >
          <Input placeholder="Title..." />
        </Form.Item>

        <Form.Item label="Description" name={Fields.description}>
          <Input placeholder="Description..." />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 8, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};
