import React, { useState, useEffect } from 'react';
import { extractText } from "../util/textUtils";
import Dropdown from "../component/dropdown"
import { useRouter } from 'next/router';

export default function Summary() {
    const [selectedArticles, setSelectedArticles] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [newKeyword, setNewKeyword] = useState('');
    const [isLoadingDB, setIsLoadingDB] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    

    useEffect(() => {
        const storedArticles = JSON.parse(localStorage.getItem('selectedArticles') || '[]');
        const articlesWithBasicStructure = storedArticles.map(article => ({
            ...article,
            title: article.title || '',
            abstract: article.abstract || '',
            pubDate: article.pubDate || '',
            authors: article.authors ? article.authors.split(", ").filter(Boolean) : [],
            rating: article.rating || '',
            category: [],
            keyword: [],
        }));

        fetchAdditionalDetails(articlesWithBasicStructure);
        console.log(selectedArticles);

    }, []);

    const fetchAdditionalDetails = async (articles) => {
        setIsLoading(true);
    
        const detailedArticles = await Promise.all(articles.map(async (article) => {
            try {
                const response = await fetch('/api/selectedPaperDetails', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ abstract: article.abstract }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch additional details');
                }
    
                const { category, keyword } = await response.json();
    
                // Assuming category and keyword are strings, split them into arrays
                const categories = category.split(', ').filter(Boolean);
                const keywords = keyword.split(', ').filter(Boolean);
    
                return { ...article, category: categories, keyword: keywords };
            } catch (error) {
                console.error('Error fetching additional details for article:', article.pmid, error);
                return article; // Return the original article in case of error
            } finally {
                setIsLoading(false);
            }
        }));
    
        setSelectedArticles(detailedArticles);
        console.log(detailedArticles);
    };

    const handleAddCategory = (pmid, categoryToAdd) => {
        setSelectedArticles(articles =>
            articles.map(article =>
                article.pmid === pmid
                    ? { ...article, category: [...article.category, categoryToAdd].filter((v, i, a) => a.indexOf(v) === i) } // Add the new category if not already present
                    : article
            )
        );
    };

    // Remove category from articles.category
    const handleRemoveCategory = (pmid, categoryToRemove) => {
        setSelectedArticles(articles =>
            articles.map(article =>
                article.pmid === pmid
                    ? { ...article, category: article.category.filter(category => category !== categoryToRemove) }
                    : article
            )
        );
    };

    // Add key word to articles.keyword
    const handleAddKeyword = (pmid, newKeyword) => {
        // Prevent adding empty keywords
        if (!newKeyword.trim()) return;
        setSelectedArticles(articles =>
            articles.map(article =>
                article.pmid === pmid
                    ? { ...article, keyword: [...article.keyword, newKeyword.trim()] }
                    : article
            )
        );
    };
    
    // Remove keyword from article.keyword
    const handleRemoveKeyword = (pmid, keywordToRemove) => {
        setSelectedArticles(articles =>
            articles.map(article =>
                article.pmid === pmid
                    ? { ...article, keyword: article.keyword.filter(keyword => keyword !== keywordToRemove) }
                    : article
            )
        );
    };

    // Save and send paper to backend
    const saveUpdates = async () => {
        setIsLoadingDB(true);
        try {
            // Compile all to send
            const payload = selectedArticles.map(article => ({
                paperPMID: article.pmid,
                title: article.title,
                content: extractText(article.abstract),
                paperURL: `https://pubmed.ncbi.nlm.nih.gov/${article.pmid}/`,
                publishedDate: article.pubDate,
                authorNames: article.authors,
                categoryNames: article.category,
                keywordNames: article.keyword,
            }));

            console.log("Sending to /api/add_paper:", JSON.stringify(payload, null, 2)); // For debugging
            
            // Connect to backend and send
            const response = await fetch('http://127.0.0.1:8080/api/add_paper', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        
            const data = await response.json();

            if (response.ok) {
                console.log('Articles updated successfully:', data);
            } else {
                console.error('Failed to update articles', data);
            }
        }catch(error){
            console.error('Error saving updates', error);
        } finally {
            setIsLoadingDB(false); 
            localStorage.clear();
            router.push('/search');


        }
    };


    return (
        <div>
            <h1>Selected Articles For Database</h1>

            {isLoadingDB ? (
            <div>
            <div className="loader"></div> 
            <span> Uploading to database. You will be redirected to search page if successful. </span>
            </div>
        ) : (
            <button onClick={saveUpdates}>SAVE ALL CHANGES TO DATABASE</button>
        )}

            {/* Iterate through articles and display all values*/}

            {isLoading ? (
            <div>
            <div className="loader"></div> 
            <span> Pulling categories and keywords. </span>
            </div>
        ) : (
            <ul className="results-list">
            {selectedArticles.map(({ pmid, title, category, keyword, abstract, authors, pubDate }) => (
                <li key={pmid} className="result-item" >

                    {/* PMID, Title, Link, Date, Author Display. These Should not be editable for database */ }
                    <p> <strong > PMID:  </strong> {pmid} </p>
                    <p> <strong> Title:  </strong> {title} </p>
                    <p> <strong>Link: </strong> https://pubmed.ncbi.nlm.nih.gov/{pmid}/ </p> 
                    <p> <strong> Date: </strong> {pubDate}</p> 
                    <p><strong>Authors: </strong> 
                            {authors.map((author, index) => (
                                <span key={index} style={{ margin: "4px 4px", padding: "4px", display: "inline-block", background: "white", borderRadius: "8px" }}>
                                    {author}
                                    
                                </span>
                            ))}
                    </p>

                    {/* Abstract Display - Not editable */ }
                    <p> <strong>Abstract: </strong> </p>
                    <p className="selected_abstract"> {extractText(abstract)} </p>
                    
                    {/* Category and Key words allow for addition and removal of words*/}
                    <p> <strong>Category: </strong> 
                            {category.map((category, index) => (
                                <span key={index} style={{ margin: "4px 4px", padding: "4px", display: "inline-block", background: "white", borderRadius: "8px" }}>
                                    {category}
                                    <button onClick={() => handleRemoveCategory(pmid, category)} style={{ marginLeft: "8px" }}>×</button>
                                </span>
                            ))}
                    </p>
                    
                    <Dropdown onCategorySelected={(selectedCategory) => handleAddCategory(pmid, selectedCategory)} />

                    {/* Display Key words */}
                    <p> <strong>Key Words: </strong> 
                            {keyword.map((keyword, index) => (
                                <span key={index} style={{ margin: "4px 4px", padding: "4px", display: "inline-block", background: "white", borderRadius: "8px" }}>
                                    {keyword}
                                    <button onClick={() => handleRemoveKeyword(pmid, keyword)} style={{ marginLeft: "8px" }}>×</button>
                                </span>
                            ))}

                    </p>
                    <input
                                type="text"
                                value={newKeyword}
                                onChange={(e) => setNewKeyword(e.target.value)}
                                placeholder="New keyword"
                                
                            />
                            <button onClick={() => handleAddKeyword(pmid, newKeyword)}>+</button>
                    </li>
            ))}
            </ul>
            )}
        </div>
    );
}