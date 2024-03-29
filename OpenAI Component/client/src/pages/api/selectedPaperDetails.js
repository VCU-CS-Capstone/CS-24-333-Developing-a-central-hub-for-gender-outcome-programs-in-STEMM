// Ensure all necessary imports are correct
import OpenAI from 'openai';
import { prompt } from "../../util/promptCategoriesKeywords";

// Set up the OpenAI client with your API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Define the function to find categories and keywords using OpenAI
async function findCategoryAndKeywordsWithOpenAI(abstract) {
    const msg = JSON.stringify(abstract);
    const openaiResponse = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: 'user', content: msg},
            { role: 'system', content: prompt}
        ],
        temperature: 0.2,
        max_tokens: 120,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    });

    const response = openaiResponse.choices[0].message.content;
    const responseArray = response.split(";");
    const [category, keyword] = responseArray.map(item => item.trim());

    console.log("OpenAI API response:");
    console.log("Category: ", category);
    console.log("Keyword: ", keyword);

    return { category, keyword };
}

// The API route handler for fetching categories and keywords for an abstract
export default async function handler(req, res) {
    console.log("Received request on /api/selectedPapersDetails"); 
    if (req.method === 'POST') {
        const { abstract } = req.body;

        let analysisResults = { category: "None Found", keyword: "None Found" };

        if (abstract && abstract !== "Abstract not available") {
            analysisResults = await findCategoryAndKeywordsWithOpenAI(abstract);
        }

        // Directly return the analysis results as a response
        res.status(200).json(analysisResults);
    } else {
        // Handle non-POST requests
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
