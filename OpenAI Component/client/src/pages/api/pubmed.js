// Pub med API
// Queries pubmed and returns JSON object of array of PMIDs
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'No query found' });
    }

    try {
        const url = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch data from PubMed');

        const { esearchresult } = await response.json();
        res.status(200).json({ pmids: esearchresult.idlist });
    } catch (error) {
        console.error("API fetch error:", error);
        res.status(500).json({ error: 'Failed to fetch' });
    }
}
