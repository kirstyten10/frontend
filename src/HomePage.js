import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/search?query=${searchTerm.trim()}`);
        }
    };

    return (
        <div>
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
            <button onClick={() => navigate('/owned-books')}>Owned Books</button>
        </div>
    );
};

export default HomePage;
