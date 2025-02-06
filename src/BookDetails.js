import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [isOwned, setIsOwned] = useState(false);
    const [userRating, setUserRating] = useState("");
    const [currentRating, setCurrentRating] = useState(null);

    useEffect(() => {
        if (!bookId) return;

        fetch(`http://localhost:8080/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                checkIfBookIsOwned(data);
                const savedRating = localStorage.getItem(`rating-${bookId}`);
                if (savedRating) {
                    setCurrentRating(savedRating);
                }
            })
            .catch((error) => console.error('Error fetching book details:', error));
    }, [bookId]);

    const checkIfBookIsOwned = (book) => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        const existingBook = storedBooks.find((b) => b.book_id === book.book_id);
        setIsOwned(existingBook ? true : false);
    };

    const handleAddToOwnedBooks = () => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        storedBooks.push(book);
        localStorage.setItem('ownedBooks', JSON.stringify(storedBooks));
        setIsOwned(true);
        alert(`${book.title} successfully added to your owned books`);
    };

    const handleRemoveFromOwnedBooks = () => {
        let storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        storedBooks = storedBooks.filter((b) => b.book_id !== book.book_id);
        localStorage.setItem('ownedBooks', JSON.stringify(storedBooks));
        setIsOwned(false);
        alert(`${book.title} has been removed from your owned books`);
    };

    const handleRatingChange = (event) => {
        setUserRating(event.target.value);
    };

    const handleRateButtonClick = () => {
        if (userRating >= 0 && userRating <= 5) {
            setCurrentRating(userRating);
            localStorage.setItem(`rating-${bookId}`, userRating);
            setUserRating("");
        } else {
            alert("Please enter a rating between 0 and 5.");
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <h1>{book.title}</h1>
            <p>{book.authors}</p>
            <img src={book.imageUrl} alt={book.title} style={{ width: '200px' }} />
            <p><strong>Published Year:</strong> {book.publishYear}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Average Rating:</strong> {book.averageRating}</p>
            <p><strong>Rating:</strong> {currentRating}</p>

            <div className="rating-section">
                {currentRating === null ? (
                    <div>
                        <input
                            type="number"
                            value={userRating}
                            onChange={handleRatingChange}
                            placeholder="Rate (0-5)"
                            min="0"
                            max="5"
                        />
                        <button onClick={handleRateButtonClick}>Rate</button>
                    </div>
                ) : (
                    <div>

                        <button onClick={() => setCurrentRating(null)}>Rate Again</button>
                    </div>
                )}
            </div>

            {!isOwned ? (
                <button onClick={handleAddToOwnedBooks}>Add to Owned</button>
            ) : (
                <button onClick={handleRemoveFromOwnedBooks}>Remove From Owned</button>
            )}
        </div>
    );
};

export default BookDetails;
