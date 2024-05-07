import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        className="outline-none px-2 py-1 flex-1 border border-black"
        placeholder="Search by Email"
      />
      
      <button onClick={handleClick} className="bg-blue-500 text-white px-3 py-1 rounded-md">Search</button>
    </div>
  );
};

export default SearchBar;
