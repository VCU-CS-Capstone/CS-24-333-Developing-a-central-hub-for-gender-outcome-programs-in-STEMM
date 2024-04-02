import { parseStringPromise } from 'xml2js';
import OpenAI from 'openai';
import fetch from 'node-fetch';
import { prompt } from "../../util/promt";

// set up open AI key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// Month mapping for converting pubMed data to Database format
const monthMapping = {
    'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05', 'Jun': '06',
    'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'
};

// Function to analyze abstract with OpenAI and return a relevance score
async function analyzeRatingWithOpenAI(abstract) {

    const msg = JSON.stringify(abstract);
    const openaiResponse = await openai.chat.completions.create ( {
            model: "gpt-3.5-turbo", 
            messages: [
                { role: 'user', content: msg},
                { role: 'system', content: prompt}
              ],
            temperature: 0.7,
            max_tokens: 120,
            top_p: 1.0,
            frequency_penalty: 0.0,
            presence_penalty: 0.0,
        });

    const response = openaiResponse.choices[0].message.content;
    const rating = response.trim();

    console.log("OpenAI API response:");
    console.log("Rating: ", rating);

    return { rating };
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { pmids } = req.body;

        try {
            const pmidString = pmids.join(',');
            const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=${encodeURIComponent(pmidString)}&retmode=xml`;
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch details for PMIDs: ${pmidString}`);

            const xml = await response.text();
            const result = await parseStringPromise(xml, { explicitArray: false, ignoreAttrs: true });
            let articles = result.PubmedArticleSet.PubmedArticle;
            if (!Array.isArray(articles)) articles = [articles];

            const formattedArticles = [];
            for (let article of articles) {
                const medlineCitation = article.MedlineCitation;
                const articleData = medlineCitation.Article;
                const pmid = medlineCitation.PMID._text || medlineCitation.PMID;
                const title = articleData.ArticleTitle;
                const abstract = articleData.Abstract ? (articleData.Abstract.AbstractText._text || articleData.Abstract.AbstractText) : "Abstract not available";
                const category = [];
                const keyword = [];

                let authorsArray = articleData.AuthorList?.Author;
                if (!Array.isArray(authorsArray)) {
                    authorsArray = [authorsArray]; // Convert to array if it's a single author object
                }
                const authors = authorsArray.map(author => `${author.ForeName} ${author.LastName}`).join(", ") || "Author information not available";

                const journalPubDate = articleData.Journal?.JournalIssue?.PubDate;
                let fullPubDate = "Publication date not available";

                if (journalPubDate?.Year && journalPubDate?.Month && journalPubDate?.Day) {
                    const monthNumeric = monthMapping[journalPubDate.Month];
                    fullPubDate = monthNumeric ? `${journalPubDate.Year}-${monthNumeric}-${journalPubDate.Day}` : fullPubDate;
                } else if (journalPubDate?.Year) {
                    fullPubDate = `${journalPubDate.Year}-01-01`;
                }
                // Analyze abstract
                let analysisResults = { rating: "Not analyzed" };
                if (abstract !== "Abstract not available") {
                    analysisResults = await analyzeRatingWithOpenAI(abstract);
                }

                formattedArticles.push({ 
                    pmid, 
                    title, 
                    abstract, 
                    authors, 
                    pubDate: fullPubDate,
                    rating: analysisResults.rating,
                    category,
                    keyword,

                });
            }

            res.status(200).json({ articles: formattedArticles });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
