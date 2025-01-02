import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface HomeProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Home: React.FC<HomeProps> = ({ isDarkMode, toggleTheme }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'
      }`}
      style={{
        backgroundImage: isDarkMode ? 'url(/dark.jpg)' : 'url(/light.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Welcome to <span className="text-green-600">Recipe Finder</span>
        </h1>
        <form onSubmit={handleSearch} className="flex w-full max-w-lg">
          <input
            type="text"
            placeholder="Search for recipes by ingredients, cuisine, or keywords..."
            className={`flex-grow p-3 border rounded-l-lg transition duration-300 ${isDarkMode ? 'bg-gray-800 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-orange-500 text-white p-3 rounded-r-lg transition duration-300 ${isDarkMode ? 'hover:bg-orange-400' : 'hover:bg-orange-600'}`}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;