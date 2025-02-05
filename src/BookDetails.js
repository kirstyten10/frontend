import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (!bookId) return;

        fetch(`http://localhost:8080/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [bookId]);

    const handleAddToOwnedBooks = () => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        const existingBook = storedBooks.find((b) => b.book_id === book.book_id);

        if (existingBook) {
            alert(`${book.title} is already in your owned books`)
        } else {
            storedBooks.push(book);
            localStorage.setItem('ownedBooks', JSON.stringify(storedBooks));
            alert(`${book.title} successfully added to your owned books`)
        }
    };

    const handleRemoveFromOwnedBooks = () => {
        const storedBooks = JSON.parse(localStorage.getItem('ownedBooks')) || [];
        const existingBookIndex = storedBooks.findIndex((b) => b.book_id === book.book_id);

        if (existingBookIndex === -1) {
            alert(`${book.title} is not in your owned books`)
        } else {
            storedBooks.splice(existingBookIndex, 1);
            localStorage.setItem('ownedBooks', JSON.stringify(storedBooks));
            alert(`${book.title} successfully removed from your owned books`)
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.authors}</p>
            <p><strong>Published Year:</strong> {book.publishYear}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Average Rating:</strong> {book.averageRating}</p>
            <img src={book.imageUrl} alt={book.title} style={{ width: '200px' }} />
            <p><strong>Description:</strong> {book.description}</p>

            <button onClick={() => navigate('/search')}>Search</button>
            <button onClick={() => navigate('/')}>Home</button>
            <button onClick={() => navigate('/owned-books')}>Owned Books</button>
            <button onClick={handleAddToOwnedBooks}>Add to Owned</button>
            <button onClick={handleRemoveFromOwnedBooks}>Remove From Owned</button>

        </div>
    );
};

export default BookDetails;
