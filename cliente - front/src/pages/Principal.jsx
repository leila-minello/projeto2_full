import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Box, Grid2, Card, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Principal = () => {
  const [artist, setArtist] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSearch = async () => {
    try {
      const response = await fetch("http://localhost:27017/api/artists", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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
        Bem-vindo ao catálogo de artistas!! O que deseja fazer hoje?
      </Typography>

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

      <Button
        variant="contained"
        color="primary"
        sx={{
        mt: 2,
        backgroundColor: "black",
        "&:hover": { backgroundColor: "white", color: "black" },
    }}
        onClick={() => navigate("/ArtistPage")}
    >Adicionar um artista</Button>

      {result.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Resultados:</Typography>
          <Grid2 container spacing={4} justifyContent="center">
            {result.map((artist) => (
              <Grid2 item xs={12} sm={6} md={4} key={artist._id}>
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
              </Grid2>
            ))}
          </Grid2>
        </Box>
      )}
    </Box>
  );
};

export default Principal;
