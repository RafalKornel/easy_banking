import { useHandleResourceState, useUsers } from "../hooks";
import { Button, List, Typography } from "antd";
import { Flex } from "./Flex";

export const UsersList = () => {
  const { error, isLoading, refetch, resource } = useUsers();

  useHandleResourceState({ error, isLoading, resource });

  return (
    <Flex
      additionalStyling={{
        width: "auto",
        minWidth: "20rem",
      }}
    >
      <Typography.Title level={3}>Users:</Typography.Title>
      <List
        itemLayout="horizontal"
        dataSource={resource?.users || []}
        style={{
          maxHeight: "20rem",
          overflowY: "scroll",
        }}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              title={item.username}
              avatar={<span>{index + 1}.</span>}
            />
          </List.Item>
        )}
      />
      <Button type="primary" onClick={refetch}>
        Refetch
      </Button>
    </Flex>
  );
};
