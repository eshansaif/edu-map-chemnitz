// src/components/SearchBox.js
import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a place"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBox;
