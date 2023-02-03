import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
const Head = ({ setAddBookState }) => {
  return (
    <Card>
      <CardContent>
        <Grid marginTop={1} container alignItems="center">
          <Grid item sm={6}>
            <Box>
              <Typography variant="h5" component="h4">
                Add a Book
              </Typography>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                style={{ backgroundColor: "#FF7F50" }}
                onClick={() => setAddBookState(true)}
              >
                Add Book
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Head;
