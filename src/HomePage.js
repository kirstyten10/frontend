import React from 'react';
import Navbar from './Navbar';

const HomePage = () => {
    return (
        <div>
            <Navbar />
            <div className="home-content">
                <h1>Welcome to the Library Tracker!</h1>
            </div>
        </div>
    );
};

export default HomePage;
