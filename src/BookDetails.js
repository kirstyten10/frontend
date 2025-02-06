import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const BookDetails = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [isOwned, setIsOwned] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [isInTBR, setIsInTBR] = useState(false);
    const [userRating, setUserRating] = useState("");
    const [currentRating, setCurrentRating] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!bookId) return;

        fetch(`http://localhost:8080/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
                checkIfBookIsOwned(data);
                checkIfBookIsInWishlist(data);
                checkIfBookIsInTBR(data);
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

    const checkIfBookIsInWishlist = (book) => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const existingBook = wishlist.find((b) => b.book_id === book.book_id);
        setIsInWishlist(existingBook ? true : false);
    };

    const checkIfBookIsInTBR = (book) => {
        const storedTBR = JSON.parse(localStorage.getItem('tbrBooks')) || [];
        const existingBook = storedTBR.find((b) => b.book_id === book.book_id);
        setIsInTBR(existingBook ? true : false);
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

    const handleAddToWishlist = () => {
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist.push(book);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(true);
        alert(`${book.title} has been added to your wishlist.`);
    };

    const handleRemoveFromWishlist = () => {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        wishlist = wishlist.filter((b) => b.book_id !== book.book_id);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        setIsInWishlist(false);
        alert(`${book.title} has been removed from your wishlist.`);
    };

    const handleAddToTBR = () => {
        const storedTBR = JSON.parse(localStorage.getItem('tbrBooks')) || [];
        storedTBR.push(book);
        localStorage.setItem('tbrBooks', JSON.stringify(storedTBR));
        setIsInTBR(true);
        alert(`${book.title} successfully added to your TBR list`);
    };

    const handleRemoveFromTBR = () => {
        let storedTBR = JSON.parse(localStorage.getItem('tbrBooks')) || [];
        storedTBR = storedTBR.filter((b) => b.book_id !== book.book_id);
        localStorage.setItem('tbrBooks', JSON.stringify(storedTBR));
        setIsInTBR(false);
        alert(`${book.title} has been removed from your TBR list`);
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

            {!isInWishlist ? (
                <button onClick={handleAddToWishlist}>Add to Wishlist</button>
            ) : (
                <button onClick={handleRemoveFromWishlist}>Remove from Wishlist</button>
            )}

            {!isInTBR ? (
                <button onClick={handleAddToTBR}>Add to TBR</button>
            ) : (
                <button onClick={handleRemoveFromTBR}>Remove from TBR</button>
            )}
        </div>
    );
};

export default BookDetails;
