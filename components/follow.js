import { Linkedin, Github } from "lucide-react";
import { SiX } from "react-icons/si";

export default function Follow() {
  return (
    <section id="follow" className="pt-16">
      <h2 className="text-4xl mb-4">Follow Me</h2>
      <p className="text-lg mb-4">Connect with me on my social networks:</p>
      <div className="flex space-x-6">
        <a href="https://linkedin.com/in/adrianbailadorpanero" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" className="flex items-center space-x-2 text-blue-600 hover:underline">
          <Linkedin className="w-6 h-6" />
        </a>
        <a href="https://x.com/DotNetDevABP" target="_blank" rel="noopener noreferrer" aria-label="X Profile" className="flex items-center space-x-2 text-blue-400 hover:underline">
          <SiX className="w-6 h-6" />
        </a>
        <a href="https://github.com/AdrianBailador" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" className="flex items-center space-x-2 text-gray-300 hover:underline">
          <Github className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
}