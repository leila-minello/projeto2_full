import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => { 
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:27017/api/auth/login", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login realizado!! Bem-vindo(a) :)");
        navigate("/"); 
      } else {
        alert(data.message || "Erro no login :(");
      }
    } catch (error) {
      alert("Erro ao conectar ao servidor. Verifique se a API está rodando.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}> {}
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
        <p>
          Ainda não está cadastrado?{" "}
          <Link to="/register">Cadastre-se</Link> agora!!
        </p>
      </form>
    </div>
  );
};

export default Login;
