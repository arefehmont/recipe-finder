import Navbar from '@/components/Navbar';
import { useState, useEffect } from 'react';
import { Recipe } from '../types/Recipe';
import axios from 'axios';
import { useRouter } from 'next/router';
import { fetchRecipes as fetchRecipesFromApi } from '@/utils/api'; 
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress, Box } from '@mui/material';

const SearchResults: React.FC = () => {
  const router = useRouter();
  const { query } = router.query;
  const [recipes, setRecipes] = useState<Recipe[]>([]); 
  const [diet, setDiet] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>(''); 
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const resultsPerPage = 10;

  useEffect(() => {
    const fetchRecipesData = async () => {
      if (!query) return; 

      setLoading(true);
      setError(''); 
      setHasSearched(true); 
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
          params: {
            query: Array.isArray(query) ? query[0] : query, 
            diet,
            apiKey: 'c5afeacc867d4a0c8ad25a4c1700136d', 
          },
        });
        console.log(response.data.results); 
        setRecipes(response.data.results); 
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError('Failed to fetch recipes. Please try again later.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchRecipesData(); 
  }, [query, diet]);

  const handleDietChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDiet(event.target.value); 
  };

  const handleReturnHome = () => {
    router.push('/');
  };

  const handleViewRecipe = async (id: number) => {
    try {
      const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
        params: {
          apiKey: 'c5afeacc867d4a0c8ad25a4c1700136d', 
        },
      });
     
      router.push({
        pathname: `/recipe/${id}`,
        query: { recipe: JSON.stringify(response.data) }, 
      });
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      setError('Failed to fetch recipe details. Please try again later.'); 
    }
  };

  const totalPages = Math.ceil(recipes.length / resultsPerPage); 
  const displayedRecipes = recipes.slice(0, currentPage * resultsPerPage); 

  if (loading) return <CircularProgress />; 

  return (
    <div>
      <div className="p-4">
        <div className="flex items-center">
          <select 
            onChange={handleDietChange} 
            value={diet} 
            className={`border rounded p-2 mr-2 bg-white text-black dark:bg-gray-800 dark:text-white`}
          >
            <option value="">All Diets</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan </option>
            <option value="low-carb">Low Carb</option>
          </select>
          {hasSearched ? (
            <Button
              onClick={handleReturnHome} 
              variant="contained"
              color="primary"
              className="mr-2"
            >
              Return for New Search 
            </Button>
          ) : (
            <Button
              onClick={() => {
                if ( query) {
                  const searchQuery = Array.isArray(query) ? query[0] : query; 
                  fetchRecipesFromApi(searchQuery, '', diet); 
                }
              }}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {error && <div className="text-red-500">{error}</div>} 
        {displayedRecipes.length > 0 ? (
          displayedRecipes.map((recipe) => (
            <Card key={recipe.id} className="mb-4">
              <CardMedia
                component="img"
                alt={recipe.title}
                image={recipe.image} 
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {recipe.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {recipe.summary || 'No summary available.'}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleViewRecipe(Number(recipe.id))} 
                  className="mt-2"
                >
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>No recipes found for "{query}"</div>
        )}
      </div>
      <Box display="flex" justifyContent="center" mt={4}>
        {currentPage < totalPages && (
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            variant="contained"
            color="primary"
            className="mx-1"
          >
            Show More
          </Button>
        )}
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        {totalPages > 1 && (
          Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              variant={currentPage === index + 1 ? 'contained' : 'outlined'}
              color={currentPage === index + 1 ? 'success' : 'primary'}
              className="mx-1"
            >
              {index + 1}
            </Button>
          ))
        )}
      </Box>
    </div>
  );
};

export default SearchResults;
