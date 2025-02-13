import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtistPage from "./pages/ArtistPage"; 
import Login from "./pages/Login";
import Principal from "./pages/Principal"

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

const App = () => {
  return (
    <Router>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/principal" element={<Principal/>}/>
      </Routes>
  </ThemeProvider>
    </Router>
);
};

export default App;