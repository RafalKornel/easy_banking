import { Header } from "antd/lib/layout/layout";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";

import { Flex } from "./Flex";
import { UserSelect } from "./UserSelect";
import { useEffect, useState } from "react";

export const AppHeader = () => {
  const [currentUser, setCurrentUser] = useState<number | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    navigate(currentUser ? `/user/${currentUser}` : `/admin`);
  }, [currentUser]);

  return (
    <Header color="white">
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        additionalStyling={{ height: "100%" }}
      >
        <Typography.Title
          style={{ color: "white", margin: "auto 0", userSelect: "none" }}
          level={3}
        >
          Easy banking
        </Typography.Title>
        <Flex direction="row" additionalStyling={{ width: "auto" }}>
          <UserSelect
            value={currentUser}
            onChange={(userId) => setCurrentUser(userId)}
          />
          <Button
            type="ghost"
            htmlType="button"
            style={{ color: "white", marginLeft: "1rem" }}
            onClick={() => setCurrentUser(undefined)}
          >
            Admin
          </Button>
        </Flex>
      </Flex>
    </Header>
  );
};
