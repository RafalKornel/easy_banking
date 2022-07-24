import axios from "axios";

class Api {
  private apiPath: string;

  constructor(baseUrl: string) {
    const apiPort = process.env.REACT_APP_SERVER_PORT || 3000;

    this.apiPath = `${baseUrl}:${apiPort}`;
  }

  getApiPath(endpoint: string): string {
    return `${this.apiPath}/${endpoint}`;
  }

  get<TResponse = {}>(endpoint: string) {
    return axios.get<TResponse>(this.getApiPath(endpoint));
  }

  post<TData = {}, TResponse = {}>(endpoint: string, data: TData) {
    return axios.post<TResponse>(this.getApiPath(endpoint), data, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  }
}

export const API = new Api("http://localhost");
