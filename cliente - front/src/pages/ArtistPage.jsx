import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const ArtistPage = () => {
  const [name, setName] = useState("");
  const [favSong, setFavSong] = useState("");
  const [genre, setGenre] = useState("");
  const [popularity, setPopularity] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !favSong || !genre || !popularity) {
      setError("Todos os campos são obrigatórios!");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Usuário não autenticado!");
      return;
    }

    const artistData = { name, favSong, genre, popularity: Number(popularity) };

    try {
      const response = await fetch("http://localhost:27017/api/artists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(artistData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Artista cadastrado com sucesso!");
        setError(null);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Erro ao cadastrar o artista.");
        setSuccess(null);
      }
    } catch (err) {
      setError("Erro de conexão.");
      setSuccess(null);
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
        maxWidth: "500px",
        margin: "auto",
      }}
    >
      <Typography variant="h4" sx={{ mb: 3 }}>
        Adicionar novo artista
      </Typography>

      {error && <Typography color="error">{error}</Typography>}
      {success && <Typography color="success">{success}</Typography>}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome do artista"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
        />
        <TextField
          label="Música preferida"
          fullWidth
          required
          value={favSong}
          onChange={(e) => setFavSong(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
        />
        <TextField
          label="Gênero das músicas"
          fullWidth
          required
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
        />
        <TextField
          label="Popularidade (1-10)"
          fullWidth
          required
          value={popularity}
          onChange={(e) => setPopularity(e.target.value)}
          sx={{ mb: 2, backgroundColor: "white", borderRadius: "5px" }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            padding: "10px 20px",
            fontWeight: "bold",
            backgroundColor: "black",
            "&:hover": {
              backgroundColor: "white",
              color: "black",
            },
          }}
        >
          Salvar artista
        </Button>
      </form>
    </Box>
  );
};

export default ArtistPage;
