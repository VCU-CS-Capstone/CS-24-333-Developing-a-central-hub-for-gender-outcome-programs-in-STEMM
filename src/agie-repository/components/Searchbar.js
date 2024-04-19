"use client";
import React, { useState } from 'react';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const url = 'http://127.0.0.1:8080';

  const fetchSearchResults = async (searchQuery) => {
    const apiUrl = `${url}/api/papersbywords?words=${encodeURIComponent(searchQuery)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      onSearchResults(data); // Assuming this function handles empty arrays as well.
    } catch (error) {
      console.error('Error fetching search results: ', error);
      onSearchResults([]); // This assumes the UI can handle an empty array as "no results found".
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="border p-2 w-[500px] my-4 rounded-2"
        value={query}
        onChange={handleChange}
        placeholder="Search all of the database..."
      />
      <button
        className="bg-black/80 text-white rounded-full px-3 py-2 hover:bg-black/50"
        type="submit">Search
      </button>
    </form>
  );
};

export default SearchBar;
