import { allArticles } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import Article from "components/article";
import { Linkedin, Github } from "lucide-react";
import { SiX } from "react-icons/si";
import Head from 'next/head';

export default function Home({ articles }) {
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
            I am a passionate and dedicated .NET Software Engineer with extensive experience in application development using .NET Core, .NET Framework, Azure, React, Java and SQL Server. Throughout my career, I have demonstrated the ability to design and optimize SQL Server databases, create intuitive user interfaces using React and JavaScript, and efficiently manage code version control with Git.
            <br />
            <br />
            I possess solid knowledge of the entire software development lifecycle, including requirements analysis, application implementation, testing and maintenance. I am always seeking opportunities to apply and expand my technical skills while delivering valuable and innovative solutions to software development teams.
            <br />
            <br />
            My long-term goal is to become a Software Architect. I am continuously learning and improving my skills to achieve this objective. I strongly believe in the potential of technology to enhance business operations, and I am motivated by the opportunity to contribute to the creation of solutions that make a meaningful impact.
          </p>
        </section>

        <section className="pt-16">
          <h2 className="text-4xl mb-4">Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 w-full">
            {[...articles]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((article) => (
                <Article key={article.slug} article={article} />
              ))}
          </div>
        </section>

        <section className="pt-16">
          <h2 className="text-4xl mb-4">Follow Me</h2>
          <p className="text-lg mb-4">Connect with me on my social networks:</p>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com/in/adrianbailadorpanero"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex items-center space-x-2 text-blue-600 hover:underline"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="https://x.com/DotNetDevABP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile"
              className="flex items-center space-x-2 text-blue-400 hover:underline"
            >
              <SiX className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/AdrianBailador"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex items-center space-x-2 text-gray-300 hover:underline"
            >
              <Github className="w-6 h-6" />
            </a>
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