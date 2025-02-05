import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetails = () => {
    const { bookId } = useParams(); // Get bookId from URL
    const navigate = useNavigate(); // Hook for navigation
    const [book, setBook] = useState(null);

    useEffect(() => {
        if (!bookId) return;

        fetch(`http://localhost:8080/books/${bookId}`)
            .then((response) => response.json())
            .then((data) => setBook(data))
            .catch((error) => console.error('Error fetching book details:', error));
    }, [bookId]);

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

            <button onClick={() => navigate('/search')}>Back to Search</button>
        </div>
    );
};

export default BookDetails;
