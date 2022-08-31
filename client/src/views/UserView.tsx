import { useParams } from "react-router-dom";

export const UserView = () => {
  const { id } = useParams();

  return <span>user {id}</span>;
};
