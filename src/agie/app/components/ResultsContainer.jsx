import { SearchBar } from './SearchBar';
import { SortAndFilterBar } from './SortAndFilterBar';
import { ResultItem } from './ResultItem';
import { Pagination } from './Pagination';

export const ResultsContainer = ({ filteredPapers, totalPapers, onSortCriteriaChange }) => {
    return (
        <section className="flex-grow p-4">
            <SearchBar />
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