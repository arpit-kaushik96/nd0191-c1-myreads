import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { search } from "./BooksAPI";
import Book from "./Book.jsx";

const SearchBooks = ({ books, onShelfChange }) => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim()) {
      setLoading(true);
      const timer = setTimeout(() => {
        search(query.trim(), 20)
          .then((results) => {
            // Map shelf information from existing books
            const resultsWithShelves = results.map((result) => {
              const existingBook = books.find((book) => book.id === result.id);
              return {
                ...result,
                shelf: existingBook ? existingBook.shelf : "none",
              };
            });
            setSearchResults(resultsWithShelves);
            setLoading(false);
          })
          .catch(() => {
            setSearchResults([]);
            setLoading(false);
          });
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [query, books]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/" className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="search-books-results">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ol className="books-grid">
            {searchResults.map((book) => (
              <Book key={book.id} book={book} onShelfChange={onShelfChange} />
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
