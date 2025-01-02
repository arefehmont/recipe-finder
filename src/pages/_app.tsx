import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import '../styles/globals.css'; 
import type { AppProps } from 'next/app';
import Navbar from '../components/Navbar'; 

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode ? 'dark' : 'light';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <Provider store={store}>
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
        <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Component {...pageProps} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      </div>
    </Provider>
  );
};

export default MyApp;