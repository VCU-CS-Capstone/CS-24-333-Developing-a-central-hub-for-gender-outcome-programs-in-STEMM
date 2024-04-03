"use client"
import React, { useState } from 'react';
import Link from "next/link";
import { useNavigate } from 'react-router-dom';


function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://127.0.0.1:5000/api/paperbycategory/${searchTerm}`)
    .then(response => {
      if (!response.ok) {
        //throw new Error(HTTP error! status: ${response.status});
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
    console.log(`Searching for ${searchTerm}...`);
  };

  function handleClick(){
    navigate('/result')
  }
  return (
    <form onSubmit={handleSubmit}>
      <input className="w-[300px] h-[40px] text-black border-2 border-black/70 rounded-full px-2 py-2" type="text" placeholder='Search all of the database...' value={searchTerm} onChange={handleChange} />
      <button className='bg-black/80 text-white rounded-full px-3 py-2 hover:bg-black/50' type="button" onClick={handleClick}>Search</button>
    </form>
  );
}

export default SearchBar;