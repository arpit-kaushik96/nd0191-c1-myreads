import React from "react";

const Book = ({ book, onShelfChange }) => {
  const handleChange = (e) => {
    onShelfChange(book, e.target.value);
  };

  const authors = book.authors ? book.authors.join(", ") : "Unknown Author";
  const backgroundImage =
    book.imageLinks && book.imageLinks.thumbnail
      ? book.imageLinks.thumbnail
      : "";

  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: backgroundImage
                ? `url("${backgroundImage}")`
                : "none",
            }}
          ></div>
          <div className="book-shelf-changer">
            <select value={book.shelf || "none"} onChange={handleChange}>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{authors}</div>
      </div>
    </li>
  );
};

export default Book;
