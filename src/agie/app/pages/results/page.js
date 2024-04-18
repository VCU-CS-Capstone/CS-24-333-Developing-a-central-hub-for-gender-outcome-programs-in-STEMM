"use client";
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSearchParams } from 'next/navigation'


export default function SearchPage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [allPapers, setAllPapers] = useState([]);
    const [tempSelectedCategories, setTempSelectedCategories] = useState([]);
    const [filteredPapers, setFilteredPapers] = useState([]);
    const [sortCriteria, setSortCriteria] = useState('publishDate');
    const [searchQuery, setSearchQuery] = useState('');
    
    const searchParams = useSearchParams();
    const search = searchParams.get('query');
    console.log(search);

    useEffect(() => {
        console.log( searchQuery)
        handleSearch(searchQuery);
    }, [search]);

  
    const url = 'http://127.0.0.1:8080';

    useEffect(() => {

      // Fetch all papers
      fetch(`${url}/api/paper`)
        .then(response => response.json())
        .then(data => {
          setAllPapers(data); // Store all papers
          setFilteredPapers(data); // Set filter to all papers
        })
        .catch(error => console.error('Error fetching papers', error));
  
      // Fetch categories
      fetch(`${url}/api/categories`)
        .then(response => response.json()) 
        .then(data => setCategories(data)) 
        .catch(error => console.error('Error fetching categories', error));
      
    }, []);

    // useEffect(() => {

    //   handleSearch(search);

    // }, []);


      // Select and unselect categories
    const handleCategoryToggle = (category) => {
        setTempSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    };
    
    // Push query for categories
    const applyFilters = () => {
      if (tempSelectedCategories.length === 0) {
        setFilteredPapers(allPapers);
        setSelectedCategories([]);
      } else {
            const queryParams = new URLSearchParams();
            tempSelectedCategories.forEach(cat => queryParams.append('categoryName', cat));
        
            fetch(`${url}/api/paperByCategory?${queryParams.toString()}`)
              .then(response => response.json())
              .then(data => {
                console.log(data);
                setFilteredPapers(data);
                setSelectedCategories(tempSelectedCategories); // Update the selected categories state
              })
              .catch(error => console.error('Error fetching papers by categories', error));
            }
        };

    useEffect(() => {
          const sortedPapers = [...filteredPapers].sort((a, b) => {
              if (sortCriteria === 'publishDate') {
                  return new Date(b.publishedDate) - new Date(a.publishedDate);
              } else if (sortCriteria === 'recentlyAdded') {
                  // Assuming `addedDate` exists and is the date when the paper was added to the system
                  return new Date(b.addedDate) - new Date(a.addedDate);
              }
          });
      
          setFilteredPapers(sortedPapers);
      }, [sortCriteria, allPapers]); 


  const handleSearch = (query) => {
        setSearchQuery(query); // Update the search query state
    
        // Fetch papers based on search query
        fetch(`${url}/api/papersbywords?words=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                setFilteredPapers(data); // Update the filtered papers with search results
            })
            .catch(error => console.error('Error fetching papers by words', error));

            
    };
  
    return (
        <>
            <Navbar />
            <div className="w-full top-20">
                <div className="flex w-full pt-20">
                    <CategoriesSidebar
                        categories={categories}
                        tempSelectedCategories={tempSelectedCategories}
                        onCategoryToggle={handleCategoryToggle}
                        applyFilters={applyFilters}
                    />
                    <ResultsContainer 
                      filteredPapers={filteredPapers} 
                      totalPapers={allPapers.length} 
                      onSortCriteriaChange={setSortCriteria} 
                      onSearchResults={handleSearch}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
  }

  

// The CategoriesSidebar component
const CategoriesSidebar = ({ categories, tempSelectedCategories, onCategoryToggle, applyFilters }) => {
    return (
        <aside className="w-1/5 bg-gray-100 p-4 min-h-screen">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="flex items-center my-2">
                        <input
                            id={`checkbox-${category}`}
                            type="checkbox"
                            checked={tempSelectedCategories.includes(category)}
                            onChange={() => onCategoryToggle(category)}
                            className="mr-2"
                        />
                        {/* For accessibility, wrap the category name in a label associated with the input */}
                        <label htmlFor={`checkbox-${category}`} className="cursor-pointer">
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={() => applyFilters()} className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-black/70 transition">
                Apply Filters
            </button>
        </aside>
    );
};
// Format ALL results
const ResultsContainer = ({ filteredPapers, totalPapers, onSortCriteriaChange, onSearchResults}) => {
  return (
    <section className="flex-grow p-4">
      <SearchBar onSearchResults={onSearchResults} />
      <SortAndFilterBar
          totalPapers={totalPapers}
          resultsCount={filteredPapers.length || 0}
          onSortCriteriaChange={onSortCriteriaChange}
      />
      <div className="mt-4">
        {filteredPapers.map((result, index) => (
          <ResultItem key={index} result={result} />
        ))}
      </div>
      <Pagination />
    </section>
  );
};


// Kinds cool
const SortAndFilterBar = ({ totalPapers, resultsCount, onSortCriteriaChange }) => (
  <div className="flex justify-between items-center my-2">
    <div>
      Sort by: 
      <select 
        onChange={(e) => onSortCriteriaChange(e.target.value)}
        style={{ border: 'none', fontSize: 17 }}
      >
        <option value="publishDate">Publish Date</option>
        <option value="publishDate">Placeholder 1</option>
        <option value="publishDate">Placeholder 2</option>
        <option value="publishDate">Placeholder 3</option>
      </select>
    </div>
    <div>
      Showing {resultsCount} of {totalPapers} results
    </div>
  </div>
);

 // Individual Results
const ResultItem = ({ result }) => {
    const formattedDate = new Date(result.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  
    return (
      <div className="border-b py-4 my-2 hover:bg-gray-50 transition-colors">
        <h3 className="text-xl font-bold">{result.title}</h3>
        {/* Consider truncating content if it's too long */}
        <p className="text-gray-600">{result.content.substring(0, 200)}...</p>
        <a href={result.paperURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          Read more
        </a>
        <div className="text-sm text-gray-500">Published on: {formattedDate}</div>
      </div>
    );
};

  // Navigation
  const Pagination = () => (
    <div className="flex justify-between items-center border-t pt-4">
      
      {/* Pagination buttons */}
      <div className="flex space-x-1">
        {/* Buttons go here */}
      </div>
    </div>
);

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
      event.preventDefault();
      onSearchResults(query); // Pass the query back up to the parent component
  };

  return (
      <form onSubmit={handleSubmit} className="justify-row">
          <input
              className= "border p-2 w-[50%] my-4 rounded-2"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for papers..."
          />
          <button type="submit" className="bg-black/80 text-white rounded-full px-5 py-2 hover:bg-black/50">Search</button>
      </form>
  );
};