import React, { useState, useEffect } from 'react';

const Dropdown = ({ onCategorySelected }) => {
  // State to keep track of the selected option
  const [selected, setSelected] = useState('');
  const [categories, setCategories] = useState([]);
  const url = 'http://127.0.0.1:8080';

  useEffect(() => {
      const apiUrl = `api/allCategories`;
      fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
              setCategories(data);
              setSelected(data[0]?.value);
          })
          .catch(error => {
              console.error('Error fetching data: ', error);
              setCategories([]);
          });
  }, []);


  // Handler for when an option is selected
  const handleChange = (e) => {
    const newValue = e.target.value;
    setSelected(newValue);
    if (onCategorySelected) {
      onCategorySelected(newValue);
    }
  };

  return (
    <select value={selected} onChange={handleChange}>
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};


export default Dropdown