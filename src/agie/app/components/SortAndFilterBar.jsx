export const SortAndFilterBar = ({ totalPapers, resultsCount, onSortCriteriaChange }) => (
    <div className="flex justify-between items-center my-2">
        <div>
            Sort by: 
            <select 
                onChange={(e) => onSortCriteriaChange(e.target.value)}
                style={{ border: 'none', fontSize: 17 }}
            >
                <option value="publishDate">Publish Date</option>
                {/* Add additional options as necessary */}
            </select>
        </div>
        <div>
            Showing {resultsCount} of {totalPapers} results
        </div>
    </div>
);