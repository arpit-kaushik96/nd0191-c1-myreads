import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList.jsx";
import SearchBooks from "./SearchBooks.jsx";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books on component mount
  useEffect(() => {
    BooksAPI.getAll()
      .then((books) => {
        setBooks(books);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  // Handle shelf change
  const handleShelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // Update the local state
      setBooks((prevBooks) => {
        // Check if book already exists in state
        const existingBookIndex = prevBooks.findIndex((b) => b.id === book.id);
        if (existingBookIndex > -1) {
          // Update existing book
          const updatedBooks = [...prevBooks];
          updatedBooks[existingBookIndex] = { ...book, shelf };
          return updatedBooks;
        } else if (shelf !== "none") {
          // Add new book if shelf is not "none"
          return [...prevBooks, { ...book, shelf }];
        }
        return prevBooks;
      });
    });
  };

  if (loading) {
    return <div className="app">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<BookList books={books} onShelfChange={handleShelfChange} />} />
          <Route path="/search" element={<SearchBooks books={books} onShelfChange={handleShelfChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
