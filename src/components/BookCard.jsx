import React from "react";
import "./BookCard.css";

function BookCard({ book }) {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "/default-book.jpg"; // <-- our custom fallback image

  return (
    <div className="book-card">
      <img src={coverUrl} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author_name?.[0] || "Unknown Author"}</p>
      <p className="year">{book.first_publish_year || "N/A"}</p>
    </div>
  );
}

export default BookCard;
