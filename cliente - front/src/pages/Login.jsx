import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Enviando requisição para o backend...");
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Resposta recebida:", response);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro no login: ${errorText}`);
      }

      const data = await response.json();
      console.log("Dados da resposta:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login realizado!! Bem-vindo(a) :)");
        navigate("/");
      } else {
        alert("Erro no login: Token não recebido.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert(error.message || "Erro ao conectar ao servidor.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {" "}
        {}
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
