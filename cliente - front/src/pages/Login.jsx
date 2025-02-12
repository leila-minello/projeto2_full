import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handeLogin = async (e) => {
        e.preventDefault();
    
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login realizado!! Bem vindo(a) :)");
        navigate("/");
      } else {
        alert(data.message || "Erro no login :(");
      }
    }
    
    return (
        <div>
        <h2>Login</h2>
        <form onSubmit={handeLogin}>
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