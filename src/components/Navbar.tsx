import Link from 'next/link';

interface NavbarProps {
  toggleTheme: () => void; 
  isDarkMode: boolean; 
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, isDarkMode }) => {
  return (
    <nav className={`flex items-center justify-between p-4 ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-md`}>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className={`text-lg font-semibold ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/favorites" className={`text-lg font-semibold ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`}>
            Favorites
          </Link>
        </li>
        <li>
          <Link href="/about" className={`text-lg font-semibold ${isDarkMode ? 'text-green-400 hover:text-green-300' : 'text-green-600 hover:text-green-500'}`}>
            About Us
          </Link>
        </li>
      </ul>
      <button
        onClick={toggleTheme}
        className={`ml-auto p-2 rounded transition duration-300 ${isDarkMode ? 'bg-orange-600 text-white hover:bg-orange-500' : 'bg-orange-300 text-black hover:bg-orange-200'}`}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;