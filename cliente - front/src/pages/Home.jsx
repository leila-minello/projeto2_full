import React from "react";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: "center", mt: 5, color: "white", backgroundColor: "#d92323", padding: "120px", borderRadius: "10px", maxWidth: "600px", margin: "auto" }}>
      <Typography variant="h4" gutterBottom>Página Inicial</Typography>
      
      <Button
        variant="contained"
        color="primary"
        sx={{ backgroundColor: "black", "&:hover": { backgroundColor: "white", color: "black" } }}
        onClick={() => navigate("/login")}
      >
        Faça login para começar!
      </Button>
    </Box>
  );
};

export default Home;
