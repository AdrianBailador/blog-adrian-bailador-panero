import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");

      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", initialTheme === "dark");

      // Añadir transición solo una vez
      document.documentElement.classList.add("transition-colors", "duration-300", "ease-in-out");
    } catch (error) {
      console.error("Error al cargar el tema desde localStorage:", error);
    }
  }, []);

  // Cambiar entre los modos claro y oscuro
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
       <Head>
        <title>Adrian Bailador Panero | Senior Software Engineer</title>
        <meta name="description" content="Personal blog of Adrian Bailador Panero" />
        
  
        <meta property="og:title" content="Adrian Bailador Panero - My Blog" />
        <meta 
          property="og:description" 
          content="Explore my personal blog about software engineering, coding, and technology. Talks about .NET, C#, Azure, Visual Studio, and a little bit of Next.js." 
        />
        <meta property="og:url" content="https://blog-adrianbailadorpanero.netlify.app/" />
        <meta property="og:image" content="https://blog-adrianbailadorpanero.netlify.app/images/titulo.png" />
        <meta property="og:image:alt" content="Adrian Bailador Panero Blog Image" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        
      
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@DotNetDevABP" />
        <meta name="twitter:title" content="Adrian Bailador Panero - My Blog" />
        <meta 
          name="twitter:description" 
          content="Explore my personal blog about software engineering, coding, and technology. Talks about .NET, C#, Azure, Visual Studio, and a little bit of Next.js." 
        />
        <meta name="twitter:image" content="https://blog-adrianbailadorpanero.netlify.app/images/titulo.png" />
        
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
    </>
  );
}

export default MyApp;
