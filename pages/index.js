import { useState } from "react";
import { allArticles } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import Article from "components/article";
import { Linkedin, Github } from "lucide-react";
import { SiX } from "react-icons/si";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Head from 'next/head';

const topics = ["C#", ".NET", "Next.js", "React", "JavaScript"];
const articlesPerPage = 6;

export default function Home({ articles }) {
  const [sortOption, setSortOption] = useState("newest");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = selectedTopic
    ? articles.filter((article) =>
        topics.some(
          (topic) =>
            article.title.toLowerCase().includes(topic.toLowerCase()) &&
            topic === selectedTopic
        )
      )
    : articles;

  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOption === "readingTime") return b.readingTime - a.readingTime;
    return 0;
  });

  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="px-8">
      <Head>
        <title>Adrian Bailador Panero | Senior Software Engineer</title>
        <html lang="en" />
      </Head>

      <main className="max-w-7xl mx-auto pt-32 pb-40">
        <section className="pt-16">
          <h2 className="text-4xl mb-4">Articles</h2>
          <div className="flex flex-col sm:flex-row gap-4">
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
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
            {displayedArticles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="disabled:opacity-50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="disabled:opacity-50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const articles = allArticles.map((article) =>
    pick(article, ["title", "date", "readingTime", "slug"])
  );
  return { props: { articles } };
}
