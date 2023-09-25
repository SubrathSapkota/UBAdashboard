import { useState } from "react";
import { useHistory } from "react-router-dom";
import '../styles/loginStyle.css'

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleLogin = () => {
    // Replace this with actual validation, like checking against a database
    if (userId === "admin" && password === "admin") {
      history.push("/dashboard");
    } else {
      alert("Incorrect ID or Password!");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
