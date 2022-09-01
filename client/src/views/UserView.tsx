import { Statistic, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ErrorHandler, Flex, TransactionsTable } from "../components";
import { useHandleResourceState, useUsers } from "../hooks";

export const UserView = () => {
  const { id } = useParams();

  const { error, isLoading, resource } = useUsers();

  useHandleResourceState({ error, isLoading, resource });

  const currentUser = resource?.users.find(
    ({ id: userId }) => id && userId === Number(id)
  );

  if (!currentUser)
    return <ErrorHandler error={new Error("Couldn't find user")} />;

  return (
    <Flex>
      <Typography.Title level={2}>
        Welcome {currentUser?.username}
      </Typography.Title>
      <Statistic title="Your balance" value={currentUser?.balance} prefix="$" />

      <Flex additionalStyling={{ margin: "2rem 0" }}>
        <Typography.Title level={4}>Incoming transactions</Typography.Title>
        <TransactionsTable
          filterFunction={(transaction) =>
            transaction.recipient_id === currentUser.id
          }
        />
      </Flex>

      <Flex>
        <Typography.Title level={4}>Outcoming transactions</Typography.Title>
        <TransactionsTable
          filterFunction={(transaction) =>
            transaction.sender_id === currentUser.id
          }
        />
      </Flex>
    </Flex>
  );
};
