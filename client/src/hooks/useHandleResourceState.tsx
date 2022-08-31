import { Loader } from "../components/Loader";
import { ErrorHandler } from "../components/ErrorHandler";
import { UseResourceReturn } from "./useResource";
import { ReactNode } from "react";

type P<T> = Pick<UseResourceReturn<T>, "error" | "isLoading">;

export const useHandleResourceState = <T,>({
  error,
  isLoading,
}: P<T>): Pick<UseResourceReturn<T>, "refetch" | "resource"> | ReactNode => {
  if (isLoading) return <Loader />;

  if (error) return <ErrorHandler error={error} />;
};
