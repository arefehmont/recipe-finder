import Navbar from '@/components/Navbar';
import React from 'react';

const About = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <h1 className="text-4xl font-bold text-center text-green-600 mb-4">About Us</h1>
        <p className="text-lg text-gray-800 mb-6">
          Welcome to <span className="text-orange-500 font-semibold">Recipe Finder</span>, your go-to platform for discovering delicious recipes and culinary inspiration.
          Our mission is to make cooking enjoyable and accessible for everyone, whether you're a seasoned chef or a beginner in the kitchen.
        </p>
        <h2 className="text-2xl font-semibold text-green-500 mb-2">Our Story</h2>
        <p className="text-lg text-gray-800 mb-4">
          Founded by a group of food enthusiasts, Recipe Finder was created out of a passion for cooking and sharing
          delightful recipes. We believe that cooking should be fun, and our platform is designed to help you explore
          new flavors and techniques.
        </p>
        <h2 className="text-2xl font-semibold text-green-500 mb-2">What We Offer</h2>
        <ul className="list-disc list-inside text-lg text-gray-800 mb-4">
          <li>Extensive collection of recipes from various cuisines.</li>
          <li>User-friendly search functionality to find recipes by ingredients, cuisine, or keywords.</li>
          <li>Personalized favorites list to save your go-to recipes.</li>
          <li>Community-driven platform where users can share their own recipes and cooking tips.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-green-500 mb-2">Join Us</h2>
        <p className="text-lg text-gray-800">
          We invite you to join our community of food lovers. Start exploring, cooking, and sharing your culinary creations today!
        </p>
      </div>
    </>
  );
};

export default About;