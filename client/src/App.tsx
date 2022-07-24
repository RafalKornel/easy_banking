import { FormEvent, useState } from "react";
import { API } from "./services/api";

interface LoginRequest {
  username: string;
  password: string;
  repeatPassword: string;
}

const sendCredentials = async (
  username: string,
  password: string,
  repeatPassword: string
) => {
  const body = {
    username,
    password,
    repeatPassword,
  };

  const response = await API.post<LoginRequest>("login", body);

  return response;
};

const SubmitCredentials = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [status, setStatus] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    sendCredentials(username, password, repeatPassword).then((response) =>
      setStatus(response.status)
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: 300 }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Repeat password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <button type="submit">submit</button>
      {status !== null && status === 200 ? "ok" : "not ok"}
    </form>
  );
};

function App() {
  return (
    <div>
      <SubmitCredentials />
      <h1>hello world 123</h1>
    </div>
  );
}

export default App;
