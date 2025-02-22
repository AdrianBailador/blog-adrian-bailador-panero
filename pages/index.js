import { useState } from "react";
import { allArticles } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import Article from "components/article";
import Navbar from "components/navbar";
import Hero from "components/hero";
import About from "components/about";
import SortFilter from "components/sortFilter";
import Pagination from "components/pagination";
import Follow from "components/follow";
import Head from 'next/head';

const articlesPerPage = 6;

export default function Home({ articles }) {
  const [sortOption, setSortOption] = useState("newest");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrar artículos por tema o título
  const filteredArticles = selectedTopic
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(selectedTopic.toLowerCase())
      )
    : articles;

  // Ordenar artículos por la opción seleccionada
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortOption === "newest") return new Date(b.date) - new Date(a.date);
    if (sortOption === "oldest") return new Date(a.date) - new Date(b.date);
    if (sortOption === "readingTime") return b.readingTime - a.readingTime;
    return 0;
  });

  // Paginación de artículos
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
        <Navbar />
        <Hero />
        <About />

        <section id="articles" className="pt-16">
          <h2 className="text-4xl mb-4">Articles</h2>
          <SortFilter 
            sortOption={sortOption} 
            setSortOption={setSortOption} 
            selectedTopic={selectedTopic} 
            setSelectedTopic={setSelectedTopic} 
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
            {displayedArticles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            setCurrentPage={setCurrentPage} 
          />
        </section>

        <Follow />
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