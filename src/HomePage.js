import React, { useState } from 'react';
import SearchPage from './SearchPage';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== '') {
            setIsSearching(true);
        }
    };

    return (
        <div>
            {isSearching ? (
                <SearchPage initialQuery={searchTerm} />
            ) : (
                <>
                    <h1>Welcome to the Library Tracker!</h1>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search for books..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                </>
            )}
        </div>
    );
};

export default HomePage;
