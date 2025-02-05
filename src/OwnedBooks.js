import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OwnedBooks = () => {
    const [ownedBooks, setOwnedBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        setOwnedBooks(storedBooks);
    }, []);

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleBookClick = (bookId) => {
        console.log("Navigating to book with ID:", bookId);
        navigate(`/book-details/${bookId}`);
    };

    return (
        <div>
            <h1>Your Owned Books</h1>
            <button onClick={handleBackToHome}>Back to HomePage</button>
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
