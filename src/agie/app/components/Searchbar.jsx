export const SearchBar = () => (
  <input
      className="border p-2 w-[500px] my-4"
      type="search"
      placeholder="Type something"
  />
);


/*
"use client"
import React, { useState } from 'react';

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const url = 'http://127.0.0.1:8080';

  // Function to fetch search results
  const fetchSearchResults = async (searchQuery) => {
    const apiUrl = `${url}/api/paperbycategory?q=${encodeURIComponent(searchQuery)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (onSearchResults) {
        onSearchResults(data); 
      }
    } catch (error) {
      console.error('Error fetching search results: ', error);
      if (onSearchResults) {
        onSearchResults([]); 
      }
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    setQuery(newValue);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchResults(query);
  };

  return (
    <form onSubmit={handleSubmit}  >
      <input 
        type="text"
        className="w-[300px] h-[40px] text-black border-2 border-black/70 rounded-full px-2 py-2" 
        value={query} 
        onChange={handleChange}
        placeholder='Search all of the database...' 
        
      />
      <button 
        className='bg-black/80 text-white rounded-full px-3 py-2 hover:bg-black/50' 
        type="submit">Search
      </button>
    </form>
  );
}

export default SearchBar;

*/