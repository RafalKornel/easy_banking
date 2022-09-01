import { message } from "antd";

type TOptions = {
  loading?: string;
  success?: string;
};

export const useMutationWithToast = <TArgs, TReturn>(
  mutation: (args: TArgs) => Promise<TReturn>,
  options?: TOptions
) => {
  const key = new Date().toISOString();

  const { loading = "Loading...", success = "Success!" } = options || {};

  const mutationWithToast = (args: TArgs) => {
    message.loading({ content: loading, key });

    mutation(args)
      .then((result) => {
        message.success({ content: success, key });
        return result;
      })
      .catch((e: Error) =>
        message.error({ content: `Failed, ${e.message}`, key })
      );
  };

  return mutationWithToast;
};
