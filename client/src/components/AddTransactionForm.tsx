import { Button, Form, Input, InputNumber } from "antd";
import { useForm } from "antd/es/form/Form";
import { UserSelect } from "./UserSelect";
import { addTransaction, AddTransactionDto } from "../services/transactions";
import { formLayout } from "../styles";

enum Fields {
  senderId = "sender_id",
  recipeintId = "recipient_id",
  ammount = "ammount",
  title = "title",
  description = "description",
}

export const AddTransactionForm = () => {
  const [form] = useForm<AddTransactionDto>();

  const onSubmit = (values: AddTransactionDto) => {
    addTransaction(values);
  };

  return (
    <Form {...formLayout} form={form} onFinish={onSubmit}>
      <Form.Item
        label="Sender"
        name={Fields.senderId}
        rules={[{ required: true }]}
      >
        <UserSelect
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
          placeholder="Select recipient"
          onChange={(userId) => form.setFieldValue(Fields.recipeintId, userId)}
        />
      </Form.Item>

      <Form.Item
        label="Ammount"
        name={Fields.ammount}
        rules={[{ required: true, type: "number" }]}
      >
        <InputNumber placeholder="Ammount..." style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Title" name={Fields.title} rules={[{ required: true }]}>
        <Input placeholder="Title..." />
      </Form.Item>

      <Form.Item label="Description" name={Fields.description}>
        <Input placeholder="Description..." />
      </Form.Item>

      <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};