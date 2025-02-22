export default function Navbar() {
    return (
      <nav className="flex justify-center gap-8 mb-16">
        <a href="#about" className="text-lg text-gray-600 hover:text-blue-600">About Me</a>
        <a href="#articles" className="text-lg text-gray-600 hover:text-blue-600">Articles</a>
        <a href="#follow" className="text-lg text-gray-600 hover:text-blue-600">Follow Me</a>
      </nav>
    );
  }