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
        <div className="flex items-center gap-4">
          <img
            src="/adrian.jpg"
            alt="Adrian Bailador"
            className="w-24 h-24 rounded-full border-4 border-gray-300 object-cover"
          />
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-6xl leading-tight">Adrian Bailador Panero</h1>
            <p className="font-bold text-lg text-gray-600">Senior Software Engineer | .NET | C# | Azure | JS</p>
          </div>
        </div>

        <section className="pt-16">
          <h2 className="text-4xl mb-4">About Me</h2>
          <p className="mb-5">
            I am a passionate and dedicated .NET Software Engineer with extensive experience in application development using .NET Core, .NET Framework, Azure, React, Java, and SQL Server. Throughout my career, I have demonstrated the ability to design and optimize SQL Server databases, create intuitive user interfaces using React and JavaScript, and efficiently manage code version control with Git.
            <br />
            <br />
            I possess solid knowledge of the entire software development lifecycle, including requirements analysis, application implementation, testing, and maintenance. I am always seeking opportunities to apply and expand my technical skills while delivering valuable and innovative solutions to software development teams.
            <br />
            <br />
            My long-term goal is to become a Software Architect. I am continuously learning and improving my skills to achieve this objective. I strongly believe in the potential of technology to enhance business operations, and I am motivated by the opportunity to contribute to the creation of solutions that make a meaningful impact.
          </p>
        </section>

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