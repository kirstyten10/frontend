import React, { useEffect, useState } from "react";

function SearchPage({ navigate }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/books") // Fetch books from backend
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error("Error fetching books:", err));
    }, []);

    return (
        <div>
            <button onClick={() => navigate("home")}>Go Back</button>
            <h2>Search Results</h2>
            <ul>
                {books.map((book) => (
                    <li key={book.book_id}>{book.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchPage;
