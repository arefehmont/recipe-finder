import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite, addFavorite } from '../redux/favoritesSlice'; 
import { RootState } from '../types/State';
import { Recipe } from '../types/Recipe';

const FavoritesList = () => {
    const favorites = useSelector((state: RootState) => state.favorites);
    const dispatch = useDispatch();

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]'); 
        storedFavorites.forEach((recipe: Recipe) => { 
            if (!favorites.some(fav => fav.id === recipe.id)) {
                dispatch(addFavorite(recipe));
            }
        });
    }, [dispatch, favorites]);

    return (
        <div className="p-4">
            {favorites.length === 0 ? (
                <p>No favorites yet. Start saving your favorite recipes!</p>
            ) : (
                favorites.map((recipe: Recipe) => (
                    <div key={recipe.id} className="flex items-center justify-between border-b py-2">
                        <img src={recipe.image} alt={recipe.title} className="w-16 h-16 object-cover rounded" />
                        <span>{recipe.title}</span>
                        <button onClick={() => dispatch(removeFavorite(recipe))} className="bg-red-500 text-white p-1 rounded">
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default FavoritesList;