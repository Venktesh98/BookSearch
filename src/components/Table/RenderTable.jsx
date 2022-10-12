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

export default function BasicTable({ onBookInitialValues }) {
  const [bookValues, setBookValues] = useState(onBookInitialValues);
  const [booksData, setBooksData] = useState([]);
  const [editBook, setEditBook] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [open, setOpen] = useState(false);

  const refresh = () => {
    setBooksData(JSON.parse(localStorage.getItem("bookAdded")));
  };

  useEffect(() => {
    setBooksData(JSON.parse(localStorage.getItem("bookAdded")) || []);
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
    console.log("book:", bookItem);
    setIsEditMode(true);
    setOpen(true);
    setEditBook(bookItem);
  };

  const handleDelete = (bookItem) => {
    const newBookdData = booksData.filter((book) => book.id !== bookItem.id);
    // setBooksData(newBookdData);
    localStorage.setItem("bookAdded", JSON.stringify(newBookdData));
    refresh();
  };

  const handleSearchChange = (event) => {
    const { value } = event.target;

    if (value.length === 0) {
      setBooksData(JSON.parse(localStorage.getItem("bookAdded")));
      return;
    }

    const filteredBooks = JSON.parse(localStorage.getItem("bookAdded")).filter(
      (bookToSearch) =>
        bookToSearch.title.toLowerCase().includes(value.toLowerCase())
    );

    setBooksData(filteredBooks);
  };

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
        <TextField
          type="text"
          variant="outlined"
          onChange={handleSearchChange}
          placeholder="Search...."
        />
      </div>
      {booksData.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Book Title</TableCell>
                  <TableCell>Author Name</TableCell>
                  <TableCell>Release Year</TableCell>
                  <TableCell>Operations</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {booksData?.map((bookItem) => (
                  <TableRow
                    key={bookItem?.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {bookItem?.title}
                    </TableCell>
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
                ))}
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
        refresh={refresh}
      />
    </>
  );
}
