import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import moment from "moment";
import Head from "../components/books/Head";
import BookCard from "../components/books/BookCard";
import QuantityCard from "../components/books/QuantityCard";
import Table from "../components/books/Table";
import axios from "axios";
import AddBook from "../components/books/dialog/AddBook";
const REST_API_ENDPOINT = process.env.REACT_APP_API;

const Books = () => {
  const [view, setView] = useState("card");
  const [loadingState, setLoadingState] = useState(false);
  const [books, setBooks] = useState([]);
  const [allRows, setAllRows] = useState([]);
  const [addBookState, setAddBookState] = useState(false);
  const [editBookState, setEditBookState] = useState(false);
  const [editBook, setEditBook] = useState();
  const [refresh, setRefresh] = useState(false);

  const getBookData = async () => {
    try {
      setLoadingState(true);
      await axios.get(`${REST_API_ENDPOINT}book`).then((res) => {
        console.log(res.data);
        setAllRows(res.data);
        const detailsRows = res.data.map((row) => {
          return {
            id: row._id,
            title: row.title,
            author: row.author,
            noOfPages: row.noOfPages,
            publishedDate: moment(row.publishedDate)
              .utc()
              .format("MMMM Do YYYY"),
          };
        });
        setBooks(detailsRows);
        setLoadingState(false);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getBookData();
  }, [setAddBookState, setEditBookState, setLoadingState, refresh]);

  const handleUpdateBook = async (u_id) => {
    setEditBook(allRows.filter((row) => row._id === u_id));
    setEditBookState(true);
  };

  return (
    <div style={{ backgroundColor: "#F2F3F5", padding: 40, margin: 0 }}>
      <Grid container>
        <Grid item sm={12} lg={10}>
          <Head setAddBookState={setAddBookState}></Head>
        </Grid>
        <Grid item sm={12} lg={2}>
          <QuantityCard
            heading="Total Books"
            quantity={allRows.length}
          ></QuantityCard>
        </Grid>
      </Grid>

      <Grid marginTop={4}>
        <Card sx={{ backgroundColor: "#F2F3F5" }}>
          <Grid container alignItems="center">
            <Grid item sm={6}>
              <CardHeader title="Books"></CardHeader>
            </Grid>
            <Grid item sm={6}>
              <Box display="flex" justifyContent="flex-end" padding={2}>
                <ToggleButtonGroup
                  color="primary"
                  value={view}
                  size="small"
                  exclusive
                  onChange={(e) => setView(e.target.value)}
                >
                  <ToggleButton value="table">Table</ToggleButton>
                  <ToggleButton value="card">Card</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>{" "}
          </Grid>
          {view === "table" && (
            <CardContent>
              <Grid marginTop={1} container alignItems="center">
                <Box
                  sx={{
                    height: 400,
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Table
                    rows={books}
                    loadingState={loadingState}
                    handleUpdateBook={handleUpdateBook}
                  ></Table>
                </Box>
              </Grid>
            </CardContent>
          )}
          {view === "card" && (
            <CardContent>
              <Grid
                container
                margin={4}
                rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                {loadingState ? (
                  <CircularProgress sx={{ color: "#FF7F50" }} />
                ) : (
                  <>
                    {books.length <= 0 && (
                      <Typography variant="h6" marginLeft={5}>
                        No Books Found
                      </Typography>
                    )}
                    {books.map((row) => (
                      <Grid item key={row.id} xs={12} md={6} lg={4}>
                        <BookCard
                          book={row}
                          handleUpdateBook={handleUpdateBook}
                        ></BookCard>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>
      <>
        {addBookState && (
          <AddBook
            addBookState={addBookState}
            setAddBookState={setAddBookState}
            refresh={refresh}
            setRefresh={setRefresh}
          ></AddBook>
        )}
        {editBookState && (
          <AddBook
            addBookState={editBookState}
            setAddBookState={setEditBookState}
            editBook={editBook}
            refresh={refresh}
            setRefresh={setRefresh}
          ></AddBook>
        )}
      </>
    </div>
  );
};

export default Books;
