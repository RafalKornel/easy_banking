import { Statistic, Typography } from "antd";
import { useParams } from "react-router-dom";
import { ErrorHandler, Flex, TransfersTable } from "../components";
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
      <Flex direction="row" align="center" justify="space-between">
        <Typography.Title level={2}>
          Welcome {currentUser?.username}
        </Typography.Title>
        <Statistic
          title="Your balance"
          value={currentUser?.balance}
          prefix="$"
        />
      </Flex>

      <Flex additionalStyling={{ margin: "2rem 0" }}>
        <Typography.Title level={4}>Incoming transfers</Typography.Title>
        <TransfersTable
          filterFunction={(transfer) =>
            transfer.recipient_id === currentUser.id
          }
        />
      </Flex>

      <Flex>
        <Typography.Title level={4}>Outcoming transfers</Typography.Title>
        <TransfersTable
          filterFunction={(transfer) => transfer.sender_id === currentUser.id}
        />
      </Flex>
    </Flex>
  );
};
