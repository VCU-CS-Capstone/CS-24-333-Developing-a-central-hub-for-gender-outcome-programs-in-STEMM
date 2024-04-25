import React, { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { extractText } from "../util/textUtils"
import { useRouter } from 'next/router';
import styles from '../styles/admin.module.css';
import { useAuth } from '../Auth/AuthContext';


export default function Search() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [visibleAbstractPmid, setVisibleAbstractPmid] = useState(null);
    const [selectedItems, setSelectedItems] = useState({});
    const { isLoggedIn } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!isLoggedIn) {
        router.push('/Login');  // Redirect to login if not authenticated
      }
    }, [isLoggedIn, router]);
  

    useEffect(() => {
        const savedResults = sessionStorage.getItem('searchResults');
        if (savedResults) {
            setResults(JSON.parse(savedResults));
        }
    }, []);

    const handleCheckboxChange = (article) => {
        setSelectedItems(prevItems => {
            if (prevItems[article.pmid]) {
                const { [article.pmid]: value, ...rest } = prevItems; 
                return rest;
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
            const response = await fetch('/api/pubmed', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query }),
                signal: abortController.signal,
            });
            if (!response.ok) throw new Error('Failed to fetch');
            const { pmids } = await response.json();

            const detailsResponse = await fetch('/api/paperDetails', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pmids }),
            });
            if (!detailsResponse.ok) throw new Error('Failed to fetch details');
            const { articles } = await detailsResponse.json();

            setResults(articles);
            sessionStorage.setItem('searchResults', JSON.stringify(articles));

        } catch (error) {
            console.error("Fetch error: ", error);
        } finally {
            setLoading(false);
        }
        return () => abortController.abort();
    }, [query]);

    const toggleAbstract = useCallback((pmid) => {
        setVisibleAbstractPmid(currentVisiblePmid => currentVisiblePmid === pmid ? null : pmid);
    }, []);

    const handleGoToSummary = useCallback(() => {
        const selectedArticles = Object.values(selectedItems);
        localStorage.setItem('selectedArticles', JSON.stringify(selectedArticles));
        router.push('/selected');
    }, [selectedItems, router]);

        // Function to add an administrative user (implementation needed)
    const handleAddUser = useCallback(() => {
        router.push('/CreateLogin');
    }, []);

    return (
        <div>
        <div className={styles.htmlAdmin}>
            <div className={styles.adminContainer}>
                <button className={styles.addButton} onClick={handleAddUser}>Add Administrator</button>
            </div>            
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search PubMed"
                    className={styles.searchInput}
                    />
        {loading ? (
                <div>
                    <div className={styles.loader}></div>
                    <p className={styles.mainAdmin}> Finding and Rating Papers</p>
                </div>
            ) : (
                <button type="submit" className={styles.searchButton}>Search</button>
            )}
        </form>

        <button className={styles.submitButton} onClick={handleGoToSummary}>Add Selected Papers to Database</button>

        <ul className={styles.resultsList}>
            {results.map(({ pmid, title, rating, abstract, authors, pubDate }, index) => (
                <li key={index} className={styles.resultItem}>
                    <input
                        type="checkbox"
                        checked={!!selectedItems[pmid]}
                        className={styles.checkBox}
                        onChange={() => handleCheckboxChange({pmid, title, abstract, authors, pubDate})}
                        onClick={(e) => e.stopPropagation()}
                    />
                    <div onClick={() => toggleAbstract(pmid)}>
                        <p className={styles.mainAdmin}><strong>Title:</strong> {extractText(title)}</p>
                        <p className={styles.mainAdmin}><strong>PMID:</strong> {pmid}</p>
                        <p className={styles.mainAdmin}><strong>Date:</strong> {extractText(pubDate, 'date')}</p>
                        <p className={styles.mainAdmin}><strong>Author:</strong> {extractText(authors, 'author')}</p>
                        <p className={styles.mainAdmin}><strong>Relevance Score:</strong> {extractText(rating)}</p>
                        {visibleAbstractPmid === pmid && (
                            <p className={styles.mainAdmin}><strong>Abstract:</strong> {extractText(abstract, 'abstract')}</p>
                        )}
                        <Link href={`https://pubmed.ncbi.nlm.nih.gov/${pmid}/`}>
                            <button className={styles.linkButton}>
                                View Full Article
                            </button>
                        </Link>
                    </div>
                </li>
            ))}
        </ul>
    </div>
    </div>
);
}