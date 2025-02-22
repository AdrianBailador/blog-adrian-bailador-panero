export default function Hero() {
    return (
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
    );
  }