import React, { useState, useMemo, useEffect } from "react";
import { Button, TextField, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [logged, setLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setLogged(!!token);
    };
  
    window.addEventListener("storage", checkAuth);
    checkAuth(); 
  
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleSearch = async () => {
    if (!logged) {
      setError("Você precisa logar numa conta para pesquisar no catálogo!");
      return;
    }

    try {
      const response = await fetch("http://localhost:27017/api/artists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao buscar artistas!");

      const data = await response.json();
      setResult(data);
      setError(null);
    } catch (err) {
      setError("Erro ao buscar artistas: " + err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogged(false);
    setResult([]);
    navigate("/login");
  };

  const memoizedResult = useMemo(() => result, [result]);

  return (
    <Box
      sx={{
        fontFamily: "National",
        textAlign: "center",
        mt: 5,
        color: "white",
        backgroundColor: "#d92323",
        padding: "120px",
        borderRadius: "10px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Página inicial
      </Typography>

      {logged ? (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
          sx={{
            mb: 3,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "white", color: "black" },
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{
            mb: 3,
            backgroundColor: "black",
            "&:hover": { backgroundColor: "white", color: "black" },
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      )}

      {logged && (
        <>
          <TextField
            label="Digite o nome do artista"
            variant="outlined"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            error={!!error}
            helperText={error || ""}
            sx={{
              mb: 2,
              width: "100%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{
              display: "block",
              margin: "0 auto",
              padding: "10px 20px",
              fontWeight: "bold",
              backgroundColor: "black",
              "&:hover": { backgroundColor: "white", color: "black" },
            }}
          >
            Buscar
          </Button>

          <Link to="/ArtistPage">
            <Button
              variant="contained"
              color="success"
              sx={{
                mt: 2,
                display: "block",
                margin: "0 auto",
                padding: "10px 20px",
                fontWeight: "bold",
                backgroundColor: "#28a745",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              Adicionar um artista
            </Button>
          </Link>
        </>
      )}

      {memoizedResult.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Resultados:</Typography>
          <Grid container spacing={4} justifyContent="center">
            {memoizedResult.map((artist) => (
              <Grid item xs={12} sm={6} md={4} key={artist._id}>
                <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                  <CardContent sx={{ backgroundColor: "#fafafa", padding: "1.5rem" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {artist.name}
                    </Typography>
                    <Link to={`/artist/${artist.name}`}>
                      <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                        Ver Artista
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Home;
