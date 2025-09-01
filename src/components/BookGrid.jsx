import React from "react";
import BookCard from "./BookCard";
import "./BookGrid.css";

function BookGrid({ books, gridRef }) {
  if (!books || books.length === 0) {
    return <p className="no-books">No books available</p>;
  }

  return (
    <div ref={gridRef} className="book-grid">
      {books.map((book, index) => (
        <BookCard key={index} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
