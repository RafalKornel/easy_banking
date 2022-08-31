type Props = {
  error: Error;
};

export const ErrorHandler = ({ error }: Props) => (
  <div>
    <div>Ooops.. Something went wrong...</div>
    <div>{error.message}</div>
  </div>
);
