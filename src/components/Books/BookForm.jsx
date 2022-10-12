import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const BookForm = ({
  onBookInitialValues,
  handleClose,
  onOpen,
  onSetEditBook,
  onEditBook,
  onBooksData,
  onSetBookValues,
  onBookValues,
  isEditMode,
  refresh,
}) => {
  console.log("BookValues:", onBookValues);
  console.log("onEditBook:", onEditBook);
  useEffect(() => {
    if (onEditBook.length != 0) {
      onSetBookValues({
        ...onEditBook,
      });
    }
  }, [onEditBook]);

  //   const handleClickOpen = () => {
  //     // onSetBookValues({})
  //     onSetEditBook("");
  //     onSetOpen(true);
  //   };

  //   const handleClose = () => {
  //     onSetOpen(false);
  //   };

  const handleAddOrEdit = (event) => {
    event.preventDefault();

    // Update Book
    if (isEditMode) {
      console.log("BookValues:", onBookValues);
      const existingBooks = JSON.parse(localStorage.getItem("bookAdded"));
      const newArray = existingBooks.map((bookItem) => {
        if (bookItem.id == onBookValues.id) {
          //   way for better memory references
          return {
            ...onBookValues,
          };
        }
        return bookItem;
      });
      console.log("newArray:", newArray);
      localStorage.setItem("bookAdded", JSON.stringify(newArray));
    }
    // Inserts New Book
    else {
      const id = uuidv4();
      const updateBook = { ...onBookValues, id };
      console.log(updateBook);
      localStorage.setItem(
        "bookAdded",
        JSON.stringify([...onBooksData, updateBook])
      );
    }
    refresh();
    onSetEditBook("");
    onSetBookValues({ ...onBookInitialValues });
    handleClose();
  };

  console.log("onBookValues", onBookValues);

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    onSetBookValues({
      ...onBookValues,
      [name]: value,
    });
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Add Book
      </Button> */}
      <Dialog open={onOpen} onClose={handleClose}>
        <DialogTitle>Edit Form</DialogTitle>
        <form onSubmit={handleAddOrEdit}>
          <DialogContent>
            {/* <DialogContentText>Edit Form</DialogContentText> */}
            <TextField
              autoFocus
              name="title"
              margin="dense"
              label="Book Title"
              type="text"
              fullWidth
              variant="standard"
              value={onBookValues.title}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="author_name"
              label="Author Name"
              type="text"
              fullWidth
              variant="standard"
              value={onBookValues.author_name}
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="releaseDate"
              label="Release Year"
              type="number"
              fullWidth
              variant="standard"
              value={onBookValues.releaseDate}
              onChange={handleOnChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

export default BookForm;
