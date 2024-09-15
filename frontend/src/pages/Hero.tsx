import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Hero() {

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-blue-800 text-white overflow-hidden pt-8">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Unleash Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Writing Potential
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Share your stories, ideas, and expertise with a global audience. Our platform empowers writers to connect, inspire, and grow.
          </p>
          <Link to={'/signup'}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Writing Now
          </button>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 text-center text-gray-400 text-sm">
        Join thousands of writers sharing their passion every day
      </div>
    </div>
  );
}
