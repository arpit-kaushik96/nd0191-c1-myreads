import React from "react";
import { Link } from "react-router-dom";
import Bookshelf from "./Bookshelf.jsx";

const BookList = ({ books, onShelfChange }) => {
  const shelves = [
    { key: "currentlyReading", title: "Currently Reading" },
    { key: "wantToRead", title: "Want to Read" },
    { key: "read", title: "Read" },
  ];

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <Bookshelf
              key={shelf.key}
              title={shelf.title}
              books={books.filter((book) => book.shelf === shelf.key)}
              onShelfChange={onShelfChange}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};

export default BookList;
