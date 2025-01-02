import { Key, ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Recipe } from '@/types/Recipe'; 
import { useDispatch } from 'react-redux';
import { addFavorite, removeFavorite } from '../../redux/favoritesSlice'; 
import { Card, CardContent, CardMedia, Typography, Button, CircularProgress } from '@mui/material';

const RecipeDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string>(''); 
  const [isFavorite, setIsFavorite] = useState<boolean>(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!id) return; 

      setLoading(true);
      setError(''); 
      try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
          params: {
            apiKey: 'c5afeacc867d4a0c8ad25a4c1700136d', 
          },
        });
        setRecipe(response.data);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setError('Failed to fetch recipe details. Please try again later.'); 
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]); 

  useEffect(() => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); 
      const isFav = favorites.some((fav: Recipe) => fav.id === recipe.id);
      setIsFavorite(isFav);
    }
  }, [recipe]); 

  const handleAddToFavorites = () => {
    if (recipe) {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); 
      if (!favorites.some((fav: Recipe) => fav.id === recipe.id)) {
        const updatedFavorites = [...favorites, recipe];
        dispatch(addFavorite(recipe));
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setIsFavorite(true);
      }
    }
  };

  const handleRemoveFromFavorites = () => {
    if (recipe) {
      dispatch(removeFavorite(recipe));
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]'); 
      const updatedFavorites = favorites.filter((fav: Recipe) => fav.id !== recipe.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    }
  };

  if (loading) return <CircularProgress />; 
  if (error) return <div className="text-red-500">{error}</div>; 

  return (
    <div className="p-4 flex justify-center" style={{ paddingTop: '40px' }}> 
      {recipe && (
        <Card sx={{ maxWidth: 300, backgroundColor: '#f9f9f9', borderRadius: 2, boxShadow: 3 }}>
          <CardMedia
            component="img"
            height="200" 
            image={recipe.image}
            alt={recipe.title}
            sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2, objectFit: 'cover' }} 
          />
          <CardContent>
            <Typography variant="h5" component="div" color="green" fontWeight="bold">
              {recipe.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ready in {recipe.readyInMinutes} minutes | Servings: {recipe.servings}
            </Typography>
            <Typography variant="h6" component="div" color="orange" fontWeight="bold" mt={2}>
              Ingredients
            </ Typography>
            <ul>
              {recipe.extendedIngredients.map((ingredient: { id: Key | null | undefined; original: string | number }) => (
                <li key={ingredient.id}>
                  <Typography variant="body2" color="text.primary">
                    {ingredient.original}
                  </Typography>
                </li>
              ))}
            </ul>
            <Typography variant="h6" component="div" color="orange" fontWeight="bold" mt={2}>
              Instructions
            </Typography>
            <Typography variant="body2" color="text.primary">
              {recipe.instructions}
            </Typography>
            <Button
              onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
              variant="contained"
              color={isFavorite ? "error" : "success"}
              sx={{ mt: 3 }}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipeDetail;