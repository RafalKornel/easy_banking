import { Button, Form, Input, InputNumber, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useMutationWithToast } from "../hooks";
import { addInvoice, AddInvoiceDto } from "../services/invoices";
import { defaultFormStyling } from "../styles";
import { userLabelParserWithBalance } from "../utils/labelParsers";
import { Flex } from "./Flex";
import { UserSelect } from "./UserSelect";

enum Fields {
  userId = "user_id",
  ammount = "ammount",
  title = "title",
  description = "description",
}

export const AddInvoiceForm = () => {
  const [form] = useForm<AddInvoiceDto>();

  const handleSubmit = (values: AddInvoiceDto) => addInvoice(values);

  const handleSubmitWithMutation = useMutationWithToast(handleSubmit, {
    loading: "Creating new invoice...",
    success: "Successfully created invoice!",
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
        Create new invoice
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
          name={Fields.userId}
          rules={[{ required: true }]}
        >
          <UserSelect
            labelParser={userLabelParserWithBalance}
            placeholder="Select sender"
            onChange={(userId) => form.setFieldValue(Fields.userId, userId)}
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
