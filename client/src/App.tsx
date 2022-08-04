import { FormEvent, useState } from "react";
import { API } from "./services/api";

interface RegisterRequest {
  username: string;
  password: string;
  repeatPassword: string;
}

const registerUser = async (
  username: string,
  password: string,
  repeatPassword: string
) => {
  const body = {
    username,
    password,
    repeatPassword,
  };

  const response = await API.post<RegisterRequest>("register", body);

  return response;
};

const RegisterUserForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [status, setStatus] = useState<number | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    registerUser(username, password, repeatPassword).then((response) =>
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
      <RegisterUserForm />
      <h1>hello world 123</h1>
    </div>
  );
}

export default App;
