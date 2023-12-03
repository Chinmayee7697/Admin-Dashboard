import React from 'react';
import SearchBar from './SearchBar';
const Toolbar = ({ handleDeleteSelectedRows, handleSearch }) => {
    
    return (
        <div className="toolbar">
            {/* Search bar component */}
            <SearchBar handleSearch={handleSearch} />
            <button onClick={handleDeleteSelectedRows}><i className="fa-solid fa-trash-can" style={{ color: "#fff" }}></i></button>
        </div>
    );
};

export default Toolbar;
