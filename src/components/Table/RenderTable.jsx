import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import BookForm from "../Books/BookForm";
import { useEffect } from "react";
import axios from "axios";
import TableRowViewControl from "./TableRowViewControl";

export default function BasicTable({ onBookInitialValues }) {
  const [bookValues, setBookValues] = useState(onBookInitialValues);
  const [booksData, setBooksData] = useState(
    JSON.parse(localStorage.getItem("bookAdded"))
  );
  const [editBook, setEditBook] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [error, setError] = useState("");
  const [searchField, setSearchField] = useState("");
  const [open, setOpen] = useState(false);
  const [isDataFromApi, setIsDataFromApi] = useState(false);

  const refresh = () => {
    setBooksData(JSON.parse(localStorage.getItem("bookAdded")));
  };

  useEffect(() => {
    setBooksData(JSON.parse(localStorage.getItem("bookAdded")));
  }, []);

  const handleClickOpen = () => {
    setEditBook("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditBook("");
  };

  const handleEdit = (bookItem) => {
    console.log("book to Edit:", bookItem);
    setIsEditMode(true);
    setOpen(true);

    if (isDataFromApi) {
      const id = bookItem.id;
      const modifiedBookItem = { id, ...bookItem };
      //   console.log("modifiedBookItem:", modifiedBookItem);
      setEditBook(modifiedBookItem);
      return;
    }

    setEditBook(bookItem);
  };

  const handleDelete = (bookItem) => {
    console.log("Book to delete:", bookItem);
    const newBookdData = booksData.filter((book) => book.id !== bookItem.id);
    localStorage.setItem("bookAdded", JSON.stringify(newBookdData));
    refresh();
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchField(value);

    console.log("In value:", value);
    console.log("In value:", typeof value);
    var isValidISBN = value.match(/[9]+[0-9]{12}/g);

    if (isValidISBN && value.length === 13) {
      setError("ISBN is Valid");
    } else {
      setError("ISBN Not Valid");
    }

    if (value.length === 0) {
      console.log("Inside");
      setBooksData(JSON.parse(localStorage.getItem("bookAdded")));

      return;
    }
  };

  const handleSearchBook = (event) => {
    event.preventDefault();

    console.log("setSearchField:", searchField);
    const filteredBooks = JSON.parse(localStorage.getItem("bookAdded")).filter(
      (bookToSearch) => bookToSearch.isbn.includes(searchField)
    );

    console.log("filteredBooks:", filteredBooks);

    if (filteredBooks.length > 0) {
      setBooksData(filteredBooks);
    } else {
      axios
        .request({
          url: "https://www.googleapis.com/books/v1/volumes",
          method: "get",
          params: {
            q: searchField,
          },
        })
        .then((response) => {
          console.log("response:", response);
          setIsDataFromApi(true);
          setBooksData(response?.data?.items);
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  const displayTableRows = () => {
    return Object.keys(booksData).map((bookItem, index) => {
      //   console.log("Book Data in Ap[i:", booksData[bookItem]);
      const bookItemValue = booksData[bookItem];

      return (
        <TableRowViewControl
          uniqueKey={bookItemValue.id}
          bookItemValue={bookItemValue}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      );
    });
  };

  console.log("On BooksDta:", booksData);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          margin: "2%",
        }}
      >
        <Button variant="outlined" onClick={handleClickOpen}>
          Add Book
        </Button>

        {/* Search */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <form onSubmit={handleSearchBook}>
            <TextField
              type="number"
              variant="outlined"
              onChange={handleSearchChange}
              placeholder="Search...."
            />
            <Button type="submit" variant="outlined">
              Search
            </Button>
          </form>
        </div>
      </div>
      <p style={{ color: "red", textAlign: "right", marginRight: "2%" }}>
        {error}
      </p>
      {booksData?.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>ISBN</TableCell>
                  <TableCell>Author Name</TableCell>
                  <TableCell>Pages</TableCell>
                  <TableCell>Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isDataFromApi
                  ? booksData?.map((bookItem) => (
                      <TableRow
                        key={bookItem?.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {bookItem?.title}
                        </TableCell>
                        <TableCell>{bookItem?.isbn}</TableCell>
                        <TableCell>{bookItem?.author_name}</TableCell>
                        <TableCell>{bookItem?.releaseDate}</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            onClick={() => handleEdit(bookItem)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="text"
                            onClick={() => handleDelete(bookItem)}
                            color="error"
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  : displayTableRows()}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          Nothing to Show. Please Add Some data
        </h3>
      )}
      <BookForm
        onBookInitialValues={onBookInitialValues}
        handleClose={handleClose}
        onOpen={open}
        onSetOpen={setOpen}
        onSetEditBook={setEditBook}
        onEditBook={editBook}
        onBooksData={booksData}
        onSetBooksData={setBooksData}
        onSetBookValues={setBookValues}
        onBookValues={bookValues}
        isEditMode={isEditMode}
        isDataFromApi={isDataFromApi}
        refresh={refresh}
      />
    </>
  );
}
