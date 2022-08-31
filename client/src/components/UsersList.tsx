import { useUsers } from "../hooks/useUsers";
import { useHandleResourceState } from "../hooks/useHandleResourceState";
import { Button, List, Space, Typography } from "antd";

export const UsersList = () => {
  const { error, isLoading, refetch, resource } = useUsers();

  useHandleResourceState({ error, isLoading });

  return (
    <Space direction="vertical">
      <Typography.Title level={3}>Users:</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={resource?.users || []}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.username}
              avatar={<span>{index + 1}.</span>}
            />
          </List.Item>
        )}
      />
      <Button onClick={refetch}>Refetch</Button>
    </Space>
  );
};
