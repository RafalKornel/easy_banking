import { ReactNode } from "react";

import { Loader, ErrorHandler } from "../components";
import { UseResourceReturn } from "./useResource";

type P<T> = Pick<UseResourceReturn<T>, "error" | "isLoading" | "resource">;

export const useHandleResourceState = <T,>({
  error,
  isLoading,
  resource,
}: P<T>): Pick<UseResourceReturn<T>, "refetch" | "resource"> | ReactNode => {
  if (isLoading) return <Loader />;

  if (error) return <ErrorHandler error={error} />;

  if (resource === null) return null;
};
