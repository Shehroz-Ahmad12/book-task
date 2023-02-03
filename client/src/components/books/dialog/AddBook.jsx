import React from "react";
import {
  Button,
  TextField,
  Box,
  FormControl,
  IconButton,
  Grid,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import toast from "react-hot-toast";

import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import { useState } from "react";

const REST_API_ENDPOINT = process.env.REACT_APP_API;

const AddBook = ({
  addBookState,
  setAddBookState,
  refresh,
  setRefresh,
  editBook,
}) => {
  const [values, setValues] = React.useState({
    id: "",
    title: "",
    author: "",
    publishedDate: new Date(),
  });
  const [loading, setLoading] = useState(false);
  React.useEffect(() => {
    if (editBook) {
      setValues({
        id: editBook[0]._id,
        title: editBook[0].title,
        author: editBook[0].author,
        noOfPages: editBook[0].noOfPages,
        publishedDate: editBook[0].publishedDate,
      });
    }
  }, []);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleChangeDate = (event) => {
    setValues({
      ...values,
      publishedDate: event,
    });
  };

  const handleAdd = async () => {
    console.log(values);
    if (
      values.title &&
      values.author &&
      values.noOfPages &&
      values.publishedDate
    ) {
      try {
        setLoading(true);
        let res = await axios.post(`${REST_API_ENDPOINT}book`, values);
        console.log(res.data);
        toast.success("Book Added Successfully");
        setLoading(false);
        setRefresh(!refresh);
        setAddBookState(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please Fill All Details First");
    }
  };

  const handleUpdate = async () => {
    console.log(values);
    setLoading(true);
    try {
      let data = await axios.put(
        `${REST_API_ENDPOINT}book/${values.id}`,
        values
      );
      console.log(data);
      toast.success("Book Updated Successfully");
      setLoading(false);
      setRefresh(!refresh);

      setAddBookState(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async () => {
    console.log(values);
    setLoading(true);
    try {
      let data = await axios.delete(`${REST_API_ENDPOINT}book/${values.id}/`);
      console.log(data);
      toast.success("Book Deleted Successfully");
      setLoading(false);
      setRefresh(!refresh);

      setAddBookState(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={addBookState}
        onClose={() => setAddBookState(false)}
      >
        <div style={{ display: "flex", justifyContent: "right" }}>
          <IconButton
            onClick={() => {
              setAddBookState(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        {!editBook && <DialogTitle>Add Book</DialogTitle>}
        {editBook && <DialogTitle>Book Details</DialogTitle>}

        <DialogContent>
          <div style={{ margin: 1, backgroundColor: "white" }}>
            <Grid container>
              <Grid
                item
                sm={12}
                justifyContent="center"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <Box mt={2}>
                  <InputField
                    handleChange={handleChange}
                    value={values.title}
                    label="BookTitle"
                    name="title"
                  />
                </Box>
                <Box mt={2}>
                  <InputField
                    handleChange={handleChange}
                    value={values.author}
                    label="Book Author"
                    name="author"
                  />
                </Box>
                <Box mt={2}>
                  <InputField
                    handleChange={handleChange}
                    value={values.noOfPages}
                    label="Number of Pages"
                    name="noOfPages"
                  />
                </Box>
                <Box mt={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDatePicker
                      sx={{ width: 350 }}
                      width={350}
                      style={{ width: 350 }}
                      label="Published Date"
                      inputFormat="MM/dd/yyyy"
                      value={values.publishedDate}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!loading ? (
                <>
                  {editBook ? (
                    <Box>
                      <Button
                        variant="contained"
                        style={{
                          marginInline: 10,
                          backgroundColor: "#FF7F50",
                        }}
                        onClick={handleUpdate}
                      >
                        Edit Book
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          marginInline: 10,
                          backgroundColor: "#FF7F50",
                        }}
                        onClick={handleDelete}
                      >
                        Delete Book
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        marginInline: 10,
                        backgroundColor: "#FF7F50",
                      }}
                      onClick={handleAdd}
                    >
                      Add New Book
                    </Button>
                  )}
                </>
              ) : (
                <CircularProgress sx={{ color: "#FF7F50" }} />
              )}
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

const InputField = ({ handleChange, value, label, name }) => {
  return (
    <FormControl>
      <Box>
        <TextField
          fullWidth
          id="outlined-basic"
          name={name}
          label={label}
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
      </Box>
    </FormControl>
  );
};
export default AddBook;
