import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        setLoading(false);
        if (!response.ok) {
          throw new Error("Erro na requisição");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Resposta recebida:", data);
        if (data && data.token) {
          localStorage.setItem("authToken", data.token);
          console.log("Token:", data.token);
          navigate("/", { replace: true });
          window.location.reload(); 
        } else {
          setError(data.message || "Erro no login.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError("Erro na requisição: " + error.message);
      });
  };

  return (
    <Box sx={{ maxWidth: "400px", margin: "auto", mt: 5, padding: 3, backgroundColor: "#f4f4f4", borderRadius: "10px" }}>
      <Typography variant="h5" align="center" sx={{ mb: 3 }}>Login</Typography>

      {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

      <form onSubmit={handleLogin}>
        <TextField
          label="E-mail"
          type="email"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          disabled={loading} 
        >
          {loading ? <CircularProgress size={24} /> : "Entrar"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;
