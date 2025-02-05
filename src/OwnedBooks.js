import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const OwnedBooks = () => {
    const [ownedBooks, setOwnedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        setOwnedBooks(storedBooks);
    }, []);

    const handleBookClick = (bookId) => {
        console.log("Navigating to book with ID:", bookId);
        navigate(`/book-details/${bookId}`);
    };

    const handleAddToOwnedBooks = (book) => {
        const updatedBooks = [...ownedBooks, book];
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
        alert(`${book.title} successfully added to your owned books`);
    };

    const handleRemoveFromOwnedBooks = (book) => {
        const updatedBooks = ownedBooks.filter((b) => b.book_id !== book.book_id);
        setOwnedBooks(updatedBooks);
        localStorage.setItem('ownedBooks', JSON.stringify(updatedBooks));
        alert(`${book.title} has been removed from your owned books`);
    };

    const isBookOwned = (book) => {
        return ownedBooks.some((b) => b.book_id === book.book_id);
    };

    return (
        <div>
            <Navbar />
            <h1>Your Owned Books</h1>
            <div className="book-container">
                {ownedBooks.length > 0 ? (
                    ownedBooks.map((book) => (
                        <div key={book.book_id} className="book-item">
                            <img src={book.imageUrl}
                                alt={book.title}
                                className="book-image"
                                onClick={() => handleBookClick(book.book_id)}
                            />
                            <div className="book-title">{book.title}</div>
                            {isBookOwned(book) ? (
                                <button onClick={() => handleRemoveFromOwnedBooks(book)}>Remove From Owned</button>
                            ) : (
                                <button onClick={() => handleAddToOwnedBooks(book)}>Add to Owned</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p>You haven't added any books to your owned list yet.</p>
                )}
            </div>
        </div>
    );
};

export default OwnedBooks;
