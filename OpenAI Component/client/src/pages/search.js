import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { extractText } from "../util/textUtils"
import { useRouter } from 'next/router';

export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleAbstractPmid, setVisibleAbstractPmid] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const router = useRouter();

    useEffect(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }
        // Since this useEffect depends on the initial load, an empty dependency array is used
    }, []);

    const handleCheckboxChange = (article) => {
        setSelectedItems(prevItems => {
            // Toggle the selection state of the article
            if (prevItems[article.pmid]) {
                const { [article.pmid]: value, ...rest } = prevItems; 
                return { ...rest };
            } else {
                return { ...prevItems, [article.pmid]: article }; 
            }
        });
    };

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const abortController = new AbortController(); 
        setLoading(true);

        try {
            // Query pubmed api
            const response = await fetch('/api/pubmed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) throw new Error('Failed to fetch');
            const { pmids } = await response.json();

            // Pass responce from pubmed to openai
            const detailsResponse = await fetch('/api/paperDetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pmids }),
            });

            if (!detailsResponse.ok) throw new Error('Failed to fetch details');
            const { articles } = await detailsResponse.json();

            setResults(articles); // Update state with fetched articles, including relevance scores
            sessionStorage.removeItem('searchResults');
            sessionStorage.setItem('searchResults', JSON.stringify(articles));

        } catch (error) {
            console.error("Fetch error: ", error);
        } finally {
            setLoading(false);
        }
        return () => abortController.abort();
    }, [query]);

    // Able to click to see abstract
    const toggleAbstract = useCallback((pmid) => {
        setVisibleAbstractPmid((currentVisiblePmid) => currentVisiblePmid === pmid ? null : pmid);
    }, []);

    // Push selected papers to summary page
    const handleGoToSummary = useCallback(() => {
        const selectedArticles = Object.values(selectedItems); 
        localStorage.setItem('selectedArticles', JSON.stringify(selectedArticles));
        router.push('/selected');
    }, [selectedItems, router]);
    
    return (
        <div>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search PubMed"
                    className="search-input"
                />

        {loading ? (
            <div>
            <div className="loader"></div> 
            <p> Finding and Rating Papers</p>
            </div>
        ) : (
          <button type="submit" className="search-button">Search</button>  
        )}
      
            </form>

            <button onClick={handleGoToSummary}>Add Selected Papers to Database</button>


                <ul className="results-list">
                    {results.map(({ pmid, title, rating, abstract, authors, pubDate }, index) => (
                        <li key={index} className="result-item">
                            <input
                                type="checkbox"
                                checked={!!selectedItems[pmid]}
                                onChange={() => handleCheckboxChange({pmid, title, abstract, authors, pubDate})}
                                onClick={(e) => e.stopPropagation()}
                            />
                            <div onClick={() => toggleAbstract(pmid)}>
                                <p><strong>Title:</strong> {extractText(title)}</p>
                                <p><strong>PMID:</strong> {pmid}</p>
                                <p><strong>Date:</strong> {extractText(pubDate, 'date')}</p>  
                                <p><strong>Author:</strong> {extractText(authors, 'author')}</p>  
                                <p><strong>Relevance Score:</strong> {extractText(rating)}</p>
                                {visibleAbstractPmid === pmid && (
                                    <p><strong>Abstract:</strong> {extractText(abstract, 'abstract')}</p>
                                )}
                                <Link href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}>
                                    <button className="link_button">
                                        View Full Article
                                    </button>
                                </Link>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
