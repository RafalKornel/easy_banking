import { useEffect, useState } from "react";

const apiPort = process.env.REACT_APP_SERVER_PORT || 3000;

const getTest = () =>
  fetch(`http://localhost:${apiPort}/test`).then((response) =>
    response.text()
  );

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    getTest().then((data) => setData(data));
  }, []);

  return (
    <div>
      <h1>hello world 123</h1>
      <div>{data}</div>
    </div>
  );
}

export default App;
