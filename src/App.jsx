import React, { useState, useRef, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookGrid from "./components/BookGrid";
import DefaultBooks from "./components/DefaultBooks";
import SkeletonBookCard from "./components/SkeletonBookCard";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const gridRef = useRef(null);

  const fetchBooks = async (query) => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}`
      );
      const data = await res.json();
      setBooks(data.docs); // ✅ keep all results
      setPage(1); // reset page when new search happens
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  const booksPerPage = 12;
  const startIndex = (page - 1) * booksPerPage;
  const paginatedBooks = books.slice(startIndex, startIndex + booksPerPage);

  // ✅ Auto scroll to top of grid when page changes
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [page]);

  const handleNext = () => {
    if (startIndex + booksPerPage < books.length) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div className="app">
      <h1 className="title">📚 Book Finder</h1>
      <SearchBar onSearch={fetchBooks} />

      {loading ? (
        <div ref={gridRef} className="book-grid">
          {Array.from({ length: booksPerPage }).map((_, i) => (
            <SkeletonBookCard key={i} />
          ))}
        </div>
      ) : books.length > 0 ? (
        <>
          <div ref={gridRef}>
            <BookGrid books={paginatedBooks} />
          </div>

          {/* ✅ Pagination buttons */}
          <div className="pagination">
            <button onClick={handlePrevious} disabled={page === 1}>
              ⬅ Previous
            </button>
            <span> Page {page} </span>
            <button
              onClick={handleNext}
              disabled={startIndex + booksPerPage >= books.length}
            >
              Next ➡
            </button>
          </div>
        </>
      ) : (
        <DefaultBooks />
      )}
    </div>
  );
}

export default App;
