import React from "react";
import { Box, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        justifyItems: "center",
        marginTop: 5,
      }}
    >
      <img src="./main.jpg" alt="Book" width={400} height={400}></img>
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#FF7F50", marginTop: 10 }}
        endIcon={<NavigateNextIcon />}
        onClick={() => {
          navigate("/books");
        }}
      >
        Get Started
      </Button>
    </Box>
  );
};

export default Home;
