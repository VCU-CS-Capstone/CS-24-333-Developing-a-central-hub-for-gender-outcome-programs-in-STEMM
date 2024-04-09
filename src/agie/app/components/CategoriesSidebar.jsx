export const CategoriesSidebar = ({ categories, tempSelectedCategories, onCategoryToggle, applyFilters }) => {
    return (
        <aside className="w-1/5 bg-gray-100 p-4 min-h-screen">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} className="flex items-center my-2">
                        <input
                            id={`checkbox-${category}`}
                            type="checkbox"
                            checked={tempSelectedCategories.includes(category)}
                            onChange={() => onCategoryToggle(category)}
                            className="mr-2"
                        />
                        <label htmlFor={`checkbox-${category}`} className="cursor-pointer">
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
            <button onClick={applyFilters} className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-black/70 transition">
                Apply Filters
            </button>
        </aside>
    );
};