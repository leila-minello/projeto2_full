import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5173/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password}),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Cadastro realizado!! Faça o login agora :D");
            navigate("/login");
        } else {
            alert(data.message || "Erro ao realizar cadastro ..");
        }
    };

    return (
        <div>
            <h2>Cadastro</h2>
            <form onSubmit={handleRegister}>
                <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                />
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
                <button type="submit">Cadastrar</button>
            </form>
        </div>
    );
};

export default Register;