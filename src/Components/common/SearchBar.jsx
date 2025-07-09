import PrimaryButton from "../../Components/common/PrimaryButton";

export default function SearchBar({ query, setQuery, customWidth = "w-full" }) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Search Products
      </h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Optionally handle search submit here or let parent handle query changes live
        }}
        className={`flex items-center gap-2 ${customWidth}`}
      >
        <input
          type="text"
          placeholder="Type product name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <PrimaryButton
          type="submit"
          className="px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          aria-label="Search"
        >
          Search
        </PrimaryButton>
      </form>
    </div>
  );
}
