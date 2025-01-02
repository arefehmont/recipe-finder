import axios from 'axios';

const API_KEY = 'c5afeacc867d4a0c8ad25a4c1700136d';

export const fetchRecipes = async (query: string, includeIngredients?: string, diet?: string, number: number = 10, offset: number = 0) => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
      params: {
        query,
        includeIngredients,
        diet,
        number,
        offset,
        apiKey: API_KEY,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return []; 
  }
};