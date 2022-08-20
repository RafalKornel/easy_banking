import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ResponseWithData } from "../services/api";

export const useResource = <T>(
  getResource: () => Promise<AxiosResponse<ResponseWithData<T>>>
) => {
  const [resource, setResource] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = () => {
    setIsLoading(true);

    getResource()
      .then((response) => setResource(response.data.data))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  };

  const refetch = () => {
    setResource(null);
    setError(null);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { resource, isLoading, error, refetch };
};
