import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ArtistDetailPage = () => {
  const { id } = useParams(); 
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/artists/${id}`);
        const data = await response.json();

        if (response.ok) {
          setArtist(data);
        } else {
          setError(data.message || "Erro ao buscar artista.");
        }
      } catch (err) {
        setError("Erro de conexão.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [id]);

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>{artist.name}</h1>
      <p>Música favorita: {artist.favSong}</p>
      <p>Gênero: {artist.genre}</p>
      <p>Popularidade: {artist.popularity}</p>
    </div>
  );
};

export default ArtistDetailPage;