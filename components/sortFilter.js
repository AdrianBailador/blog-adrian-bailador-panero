export default function SortFilter({ sortOption, setSortOption, selectedTopic, setSelectedTopic }) {
    const topics = ["C#", ".NET", "Next.js", "React", "JavaScript"];
    
    return (
      <div className="flex flex-col sm:flex-row gap-6 mt-4 sm:mt-0 mb-4">
        <label htmlFor="sort" className="sr-only">Sort Articles</label>
        <select
          id="sort"
          className="border px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-white w-full sm:w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="readingTime">Longest Reading Time</option>
        </select>
  
        <label htmlFor="topic" className="sr-only">Filter Articles by Topic</label>
        <select
          id="topic"
          className="border px-2 py-1 rounded bg-white dark:bg-gray-700 dark:text-white w-full sm:w-auto"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>
    );
  }