import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
