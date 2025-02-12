import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardMedia, Button, Grid } from "@mui/material";

const ArtistPage = () => {
  const { artistName } = useParams();
  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  uuseEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${artistId}/tracks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setTracks(data);
      } catch (err) {
        setError('Erro ao buscar músicas.');
      }
    };
  
    fetchTracks();
  }, [artistId]);

  const memoizedTracks = useMemo(() => tracks, [tracks]);

  return (
    <Box sx={{ 
      fontFamily: "National",
      textAlign: "center", 
      mt: 5,
      color: "white",
      backgroundColor: "#d92323",
      padding: "120px",
      borderRadius: "10px" }}>
      {error && <Typography color="error">{error}</Typography>}

      {artist && (
        <Box>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Artista: {artist}
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Principais Músicas
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {memoizedTracks.map((track) => (
              <Grid item xs={12} sm={6} md={4} key={track.name}>
                <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia
                    component="img"
                    alt={track.name}
                    height="180"
                    image={track.albumImage}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ backgroundColor: "#fafafa", padding: "1.5rem" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {track.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Artista: {track.artist}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            sx={{
              display: "block",
              margin: "50px auto",
              padding: "0.8rem 2rem",
              fontWeight: "bold",
              borderRadius: "8px",
              backgroundColor: "black",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "white",
                color: "black"
          },
            }}
            onClick={() => navigate(-1)}
          >
            Voltar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ArtistPage;
