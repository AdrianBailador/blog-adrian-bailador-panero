import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function About() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="about" className="pt-16">
      <button
        className="flex justify-between items-center w-full text-left text-4xl font-bold mb-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        About Me
        {isOpen ? <ChevronUp size={30} /> : <ChevronDown size={30} />}
      </button>

      {isOpen && (
        <div className="mt-2 text-lg text-gray-700 dark:text-gray-300">
          <p className="mb-5">
            I am a passionate and dedicated .NET Software Engineer with extensive experience in application development using .NET Core, .NET Framework, Azure, React, Java, and SQL Server. Throughout my career, I have demonstrated the ability to design and optimize SQL Server databases, create intuitive user interfaces using React and JavaScript, and efficiently manage code version control with Git.
            <br />
            <br />
            I possess solid knowledge of the entire software development lifecycle, including requirements analysis, application implementation, testing, and maintenance. I am always seeking opportunities to apply and expand my technical skills while delivering valuable and innovative solutions to software development teams.
            <br />
            <br />
            My long-term goal is to become a Software Architect. I am continuously learning and improving my skills to achieve this objective. I strongly believe in the potential of technology to enhance business operations, and I am motivated by the opportunity to contribute to the creation of solutions that make a meaningful impact.
          </p>
        </div>
      )}
    </section>
  );
}