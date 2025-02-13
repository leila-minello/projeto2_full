import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography, CircularProgress } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      setLoading(false);
      if (!response.ok) throw new Error("Erro na requisição");

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/principal");
      } else {
        setError(data.message || "Erro no login.");
      }
    } catch (err) {
      setLoading(false);
      setError("Erro na requisição: " + err.message);
    }
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
