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
  onSetBooksData,
  onBooksData,
  onSetBookValues,
  onBookValues,
  isEditMode,
  isDataFromApi,
  refresh,
}) => {
  useEffect(() => {
    if (onEditBook.length != 0) {
      onSetBookValues({
        ...onEditBook,
      });
    }
  }, [onEditBook]);

  console.log("Book Vlaues:", onBookValues);

  const handleAddOrEdit = (event) => {
    event.preventDefault();

    // Update Book
    if (isEditMode) {
      if (isDataFromApi) {
        const newModifiedArray = Object.keys(onBooksData).map((bookItem) => {
          const bookItemKeyOfValue = onBooksData[bookItem];

          if (bookItemKeyOfValue.id === onBookValues.id) {
            return {
              ...onBookValues,
            };
          }
          return bookItemKeyOfValue;
        });
        onSetBooksData(newModifiedArray);
        onSetBookValues({ ...onBookInitialValues });
        handleClose();
        return;
      }

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
      localStorage.setItem("bookAdded", JSON.stringify(newArray));
    }
    // Inserts New Book
    else {
      const id = uuidv4();
      const updateBook = { ...onBookValues, id };
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

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    // From Database case
    if (!isDataFromApi) {
      onSetBookValues({
        ...onBookValues,
        [name]: value,
      });
      return;
    }
    // In case of Data from Google Books
    onSetBookValues({
      ...onBookValues,
      volumeInfo: {
        ...onBookValues.volumeInfo,
        [name]: value,
      },
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
              value={
                isDataFromApi
                  ? onBookValues?.volumeInfo?.title
                  : onBookValues.title
              }
              onChange={handleOnChange}
            />
            <TextField
              name="isbn"
              margin="dense"
              label="ISBN"
              type="number"
              fullWidth
              variant="standard"
              value={
                isDataFromApi && onBookValues?.volumeInfo?.industryIdentifiers
                  ? onBookValues?.volumeInfo.industryIdentifiers[0].identifier
                  : onBookValues.isbn
              }
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="author_name"
              label="Author Name"
              type="text"
              fullWidth
              variant="standard"
              value={
                isDataFromApi
                  ? onBookValues?.volumeInfo?.authors
                  : onBookValues.author_name
              }
              onChange={handleOnChange}
            />
            <TextField
              margin="dense"
              name="releaseDate"
              label="Pages"
              type="number"
              fullWidth
              variant="standard"
              value={
                isDataFromApi
                  ? onBookValues?.volumeInfo?.pageCount
                  : onBookValues.releaseDate
              }
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
