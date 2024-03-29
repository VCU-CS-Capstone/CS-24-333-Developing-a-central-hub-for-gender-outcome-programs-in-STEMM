
## Getting Started

# Client
First, fork the repo to your dev environment and install the packages:
```bash
npm install
#or
yarn
```
Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

# Server

Run development server:

python3 server.py

If you use something besides `yarn`, be sure to delete any other package manager lockfiles. 
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Important!

# For Client
Make sure that update the `OPENAI_API_KEY=yourApiKey` in the `.env` file, and then change the file name to `.env.local`. 

# For Server
Make sure that update the database login information in the `.env` file, and then change the file name to `.env.local`. 


## API Endpoints

OpenAI's [API route] is located at `src/pages/api/openai.js`.

PubMed's [API route] is located at `src/pages/api/pubmed.js`.

# Server
Python 3 server is using FLASK to query MySQL database.



The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

