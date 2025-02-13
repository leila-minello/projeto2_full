import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      console.error("Por favor, preencha todos os campos");
      return;
    }

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta recebida:", data);
        if (data && data.token) {
          console.log("Token:", data.token);
        } else {
          console.error("Erro no login:", data.message);
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
