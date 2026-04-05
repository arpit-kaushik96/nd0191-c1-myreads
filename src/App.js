import "./App.css";
import { useState, useEffect } from "react";
import * as BooksAPI from "./BooksAPI";
import BookList from "./BookList";
import SearchBooks from "./SearchBooks";

function App() {
  const [books, setBooks] = useState([]);
  const [showSearchPage, setShowSearchpage] = useState(false);
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
    <div className="app">
      {showSearchPage ? (
        <SearchBooks
          books={books}
          onShelfChange={handleShelfChange}
          onClose={() => setShowSearchpage(false)}
        />
      ) : (
        <BookList
          books={books}
          onShelfChange={handleShelfChange}
          onOpenSearch={() => setShowSearchpage(true)}
        />
      )}
    </div>
  );
}

export default App;
