import { useState, useMemo } from "react";
import { allArticles } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import Article from "components/article";
import Navbar from "components/navbar";
import Hero from "components/hero";
import About from "components/about";
import SortFilter from "components/sortFilter";
import Pagination from "components/pagination";
import Follow from "components/follow";
import Head from "next/head";

const articlesPerPage = 6;

export default function Home({ articles }) {
  const [sortOption, setSortOption] = useState("newest");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrado y ordenación con useMemo para evitar cálculos innecesarios
  const processedArticles = useMemo(() => {
    let filtered = selectedTopic
      ? articles.filter((article) =>
          article.title.toLowerCase().includes(selectedTopic.toLowerCase())
        )
      : articles;

    return filtered.sort((a, b) => {
      if (sortOption === "newest") return b.timestamp - a.timestamp;
      if (sortOption === "oldest") return a.timestamp - b.timestamp;
      if (sortOption === "readingTime") return b.readingTime - a.readingTime;
      return 0;
    });
  }, [articles, selectedTopic, sortOption]);

  // Paginación
  const totalPages = Math.ceil(processedArticles.length / articlesPerPage);
  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = processedArticles.slice(startIndex, startIndex + articlesPerPage);

  return (
    <div className="px-8">
      <Head>
        <title>Adrian Bailador Panero | Senior Software Engineer</title>
        <meta name="description" content="Personal blog of Adrian Bailador Panero" />
        <meta property="og:title" content="Adrian Bailador Panero - My Blog" />
        <meta property="og:description" content="Explore my personal blog about software engineering, coding, and technology." />
        <meta property="og:image" content="https://blog-adrian-bailador-panero.vercel.app/adrian.jpg" />
        <meta name="author" content="Adrian Bailador Panero" />
        <meta property="article:published_time" content="2025-02-22T10:00:00Z" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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

// getStaticProps optimizado con manejo de errores y validación
export async function getStaticProps() {
  try {
    const articles = allArticles?.map((article) => ({
      ...pick(article, ["title", "date", "readingTime", "slug"]),
      timestamp: new Date(article.date).getTime(), // Preconvertimos la fecha para mejorar rendimiento en sort
    })) || [];

    return { props: { articles } };
  } catch (error) {
    console.error("Error loading articles:", error);
    return { 
      props: { 
        articles: [] 
      },
      revalidate: 60,  // Regenerar la página cada 60 segundos
    };
  }
}
