import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  // Cambiar entre los modos claro y oscuro
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    try {
     
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        setTheme(savedTheme);
        document.documentElement.classList.add(savedTheme); 
      } else {
        
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = systemPrefersDark ? "dark" : "light";
        setTheme(initialTheme);
        document.documentElement.classList.add(initialTheme); 
      }


      document.documentElement.classList.add("transition-colors", "duration-300", "ease-in-out");
    } catch (error) {
      console.error("Error al cargar el tema desde localStorage:", error);
    }
  }, []); 

  return (
    <div>
      <Head>
        <title>My Blog - Adrian Bailador Panero</title>
        <meta name="description" content="Personal blog of Adrian Bailador Panero" />
        <meta property="og:title" content="Adrian Bailador Panero - My Blog" />
        <meta property="og:description" content="Explore my personal blog about software engineering, coding, and technology." />
        <meta property="og:image" content="/adrian.jpg" />
        <meta name="author" content="Adrian Bailador Panero" />
        <meta property="article:published_time" content="2025-02-22T10:00:00Z" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        className="fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full transition-colors duration-300 ease-in-out"
      >
        {theme === "light" ? (
          <Moon className="w-6 h-6 text-gray-800 dark:text-white" />
        ) : (
          <Sun className="w-6 h-6 text-yellow-500" />
        )}
      </button>

      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;