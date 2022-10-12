import React from "react";
import BasicTable from "../Table/RenderTable";

const bookInitialValues = {
  id: null,
  title: "",
  author_name: "",
  releaseDate: "",
};

const Books = () => {
  return (
    <div>
      {/* <BasicTable onSetBooksData={onSetBooksData} /> */}
      <BasicTable onBookInitialValues={bookInitialValues} />
    </div>
  );
};

export default Books;
