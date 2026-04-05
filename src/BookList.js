import React from "react";
import Bookshelf from "./Bookshelf";

const BookList = ({ books, onShelfChange, onOpenSearch }) => {
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
        <a onClick={onOpenSearch}>Add a book</a>
      </div>
    </div>
  );
};

export default BookList;
