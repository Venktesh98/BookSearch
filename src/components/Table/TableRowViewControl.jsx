import { Button, TableCell, TableRow } from "@mui/material";
import React from "react";

const TableRowViewControl = ({
  uniqueKey,
  bookItemValue,
  handleEdit,
  handleDelete,
}) => {
  console.log(bookItemValue);
  return (
    <>
      <TableRow
        key={uniqueKey}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
        }}
      >
        <TableCell component="th" scope="row">
          {bookItemValue?.volumeInfo?.title}
        </TableCell>
        <TableCell>
          {bookItemValue && bookItemValue?.volumeInfo?.industryIdentifiers
            ? bookItemValue?.volumeInfo?.industryIdentifiers[0].identifier
            : null}
        </TableCell>
        <TableCell>{bookItemValue?.volumeInfo?.authors}</TableCell>
        <TableCell>{bookItemValue?.volumeInfo?.pageCount}</TableCell>
        <TableCell>
          <Button variant="outlined" onClick={() => handleEdit(bookItemValue)}>
            Edit
          </Button>
          <Button
            variant="text"
            onClick={() => handleDelete(bookItemValue)}
            color="error"
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    </>
  );
};

export default TableRowViewControl;
