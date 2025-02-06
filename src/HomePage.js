import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [ownedBooks, setOwnedBooks] = useState([]);
    const [visibleBooksCount] = useState(20);
    const [randomBooks, setRandomBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        setOwnedBooks(storedBooks);

        if (storedBooks.length > 0) {
            setRandomBooks(getRandomBooks(storedBooks, 20));
        }
    }, []);

    const handleBookClick = (bookId) => {
        navigate(`/book-details/${bookId}`);
    };

    const getRandomBooks = (books, count) => {
        const shuffledBooks = [...books];
        for (let i = shuffledBooks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledBooks[i], shuffledBooks[j]] = [shuffledBooks[j], shuffledBooks[i]];
        }
        return shuffledBooks.slice(0, count);
    };

    const handleViewMore = () => {
        navigate('/owned-books');
    };

    const handleViewMoreBooks = () => {
        navigate('/search?query=ane');
    };

    return (
        <div>
            <Navbar />
            <div className="home-content">
                <h1>Welcome to the Library Tracker!</h1>
                <h2>Your Owned Books</h2>

                <div className="book-scroll-container">
                    {ownedBooks.slice(0, visibleBooksCount).map((book) => (
                        <div key={book.book_id} className="book-item">
                            <img
                                src={book.imageUrl}
                                alt={book.title}
                                className="book-image"
                                onClick={() => handleBookClick(book.book_id)}
                            />
                        </div>
                    ))}
                    {ownedBooks.length > visibleBooksCount && (
                        <button onClick={handleViewMore}>
                            View More
                        </button>
                    )}
                </div>
            </div>

            <div className="try-section">
                <h2>Why Not Try?</h2>

                <div className="book-scroll-container">
                    {randomBooks.length > 0 ? (
                        randomBooks.map((book) => (
                            <div key={book.book_id} className="book-item">
                                <img
                                    src={book.imageUrl}
                                    alt={book.title}
                                    className="book-image"
                                    onClick={() => handleBookClick(book.book_id)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No books available</p>
                    )}
                    {ownedBooks.length > visibleBooksCount && (
                        <button onClick={handleViewMoreBooks}>
                            View More
                        </button>
                    )}
                </div>
            </div>
        </div>


    );
};

export default HomePage;
