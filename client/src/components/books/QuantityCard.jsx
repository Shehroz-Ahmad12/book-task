import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const QuantityCard = ({ quantity, heading }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: "#FF7F50",
        padding: 2,
        width: 170,
        borderRadius: 2,
        marginLeft: 1,
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" color="white" sx={{ fontWeight: "bold" }}>
          {quantity}
        </Typography>
        <MenuBookIcon sx={{ color: "white" }}></MenuBookIcon>
      </Box>
      <Typography color="white" variant="subtitle2">
        {heading}
      </Typography>
    </Paper>
  );
};

export default QuantityCard;
