import { allArticles } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";
import Article from "components/article";
import { Twitter, Linkedin, Github } from "lucide-react"; // Importamos los íconos necesarios

export default function Home({ articles }) {
  return (
    <div className="px-8">
      <main className="max-w-7xl mx-auto pt-32 pb-40">
        <h1 className="mb-0 text-6xl">Adrian Bailador Panero</h1>
        <p className="font-bold">Senior Software Engineer | .NET | C# | Azure | JS</p>
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
              className="flex items-center space-x-2 text-blue-600 hover:underline"
            >
              <Linkedin className="w-6 h-6" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://x.com/DotNetDevABP"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-blue-400 hover:underline"
            >
              <Twitter className="w-6 h-6" />
              <span>Twitter</span>
            </a>
            <a
              href="https://github.com/AdrianBailador"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-800 hover:underline"
            >
              <Github className="w-6 h-6" />
              <span>GitHub</span>
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