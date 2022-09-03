import { Button, Typography } from "antd";
import { Flex } from ".";
import { useMutationWithToast } from "../hooks";
import { API } from "../services/api";

const triggerSeed = () => API.post("seed");

export const SeederSection = () => {
  const triggerSeedWithToast = useMutationWithToast(triggerSeed);

  return (
    <Flex additionalStyling={{ margin: "4rem 0" }}>
      <Typography.Title level={3}>Seeder</Typography.Title>

      <Button onClick={triggerSeedWithToast}>Trigger seed</Button>
    </Flex>
  );
};
