export const ResultItem = ({ result }) => {
    const formattedDate = new Date(result.publishedDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="border-b py-4 my-2 hover:bg-gray-50 transition-colors">
            <h3 className="text-xl font-bold">{result.title}</h3>
            <p className="text-gray-600">{result.content.substring(0, 200)}...</p>
            <a href={result.paperURL} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                Read more
            </a>
            <div className="text-sm text-gray-500">Published on: {formattedDate}</div>
        </div>
    );
};