import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const BookCard = ({ book, handleUpdateBook }) => {
  return (
    <Card width={240} elevation={4}>
      <CardActionArea>
        <CardHeader title={book.title} />
        <Divider></Divider>
        <CardContent>
          <Typography marginBottom>Author: {book.author}</Typography>
          <Typography marginBottom>
            Number of Pages: {book.noOfPages}
          </Typography>
          <Divider />
          <Typography marginBottom>
            Published Date: {book.publishedDate}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Divider></Divider>
      <CardActions>
        <Grid item xs align="right">
          <Button
            variant="contained"
            size="small"
            endIcon={<DeleteIcon />}
            style={{ backgroundColor: "#FF7F50" }}
            onClick={() => {
              handleUpdateBook(book.id);
            }}
          >
            Edit
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default BookCard;
