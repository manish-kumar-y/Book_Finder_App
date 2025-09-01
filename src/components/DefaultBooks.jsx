import React, { useEffect, useState } from "react";
import BookGrid from "./BookGrid";

function DefaultBooks() {
  const [allBooks, setAllBooks] = useState([]);
  const [page, setPage] = useState(1);
  const booksPerPage = 21; // show 21 books per page

  useEffect(() => {
    const fetchDefaults = async () => {
      const res = await fetch("https://openlibrary.org/search.json?title=harry+potter");
      const data = await res.json();
      setAllBooks(data.docs); // store all books, not just 12
    };
    fetchDefaults();
  }, []);

  // calculate which books to show
  const startIndex = (page - 1) * booksPerPage;
  const paginatedBooks = allBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div>
      <BookGrid books={paginatedBooks} />

      {/* Pagination Controls */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "10px" }}>
        <button 
          disabled={page === 1} 
          onClick={() => setPage(page - 1)}
          style={{ padding: "10px 20px", cursor: page === 1 ? "not-allowed" : "pointer" }}
        >
          Previous
        </button>
        <button 
          disabled={startIndex + booksPerPage >= allBooks.length} 
          onClick={() => setPage(page + 1)}
          style={{ padding: "10px 20px", cursor: startIndex + booksPerPage >= allBooks.length ? "not-allowed" : "pointer" }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default DefaultBooks;
