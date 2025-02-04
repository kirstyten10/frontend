import React from 'react';

const BookDetails = ({ book, navigate }) => {
    return (
        <div>
            <h1>{book.title}</h1>
            <p>{book.authors}</p>
            <p><strong>Published Year:</strong> {book.publishYear}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Average Rating:</strong> {book.averageRating}</p>
            <img src={book.imageUrl} alt={book.title} style={{ width: '200px' }} />
            <p><strong>Description:</strong> {book.description}</p>

            <button onClick={() => navigate('search')}>Back to Search</button>
        </div>
    );
};

export default BookDetails;
