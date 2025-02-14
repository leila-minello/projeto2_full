import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ArtistSearch = () => {
  const [artistName, setArtistName] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/artists?name=${artistName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Artista não encontrado");
      }

      const artist = await response.json();
      navigate(`/artists/${artist._id}`);
    } catch (error) {
      console.error(error);
      alert("Artista não encontrado. Por favor, verifique o nome e tente novamente.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Digite o nome do artista"
        value={artistName}
        onChange={(e) => setArtistName(e.target.value)}
      />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
};

export default ArtistSearch;