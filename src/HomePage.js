import React, { useState } from "react";

function HomePage({ navigate }) {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = () => {
        navigate("search");
    };

    return (
        <div>
            <h1>Welcome to Library Tracker</h1>
            <input
                type="text"
                placeholder="Search for books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default HomePage;
