import "./App.css";
import BookForm from "./components/Books/BookForm";
import Books from "./components/Books/Books";
import BasicTable from "./components/Table/RenderTable";

const BooksData = [
  {
    id: 1,
    author_name: "vgs",
    title: "Oliver Twist",
    pages: 234,
    releaseDate: 1839,
  },
  {
    id: 2,
    author_name: "vgs",
    title: "Hard Times",
    pages: 300,
    releaseDate: 1854,
  },
  {
    id: 3,
    author_name: "vgs",
    title: "Hamlet",
    pages: 160,
    releaseDate: 1603,
  },
  {
    id: 4,
    author_name: "vgs",
    title: "IT",
    pages: 500,
    releaseDate: 2017,
  },
  {
    id: 5,
    author_name: "vgs",
    title: "Norwegian Wood",
    pages: 296,
    releaseDate: 1987,
  },
  {
    id: 6,
    author_name: "vgs",
    title: "Kafka on the Shore",
    pages: 505,
    releaseDate: 2002,
  },
  {
    id: 7,
    author_name: "vgs",
    title: "After Dark",
    pages: 208,
    releaseDate: 2004,
  },
  {
    id: 8,
    author_name: "vgs",
    title: "1Q84",
    pages: 928,
    releaseDate: 2009,
  },
];

function App() {
  return (
    <div>
      <h1>Books Shelf</h1>
      {/* <Books onSetBooksData={BooksData} /> */}
      <Books />
      {/* <BookForm /> */}
      {/* <BasicTable /> */}
    </div>
  );
}

export default App;
