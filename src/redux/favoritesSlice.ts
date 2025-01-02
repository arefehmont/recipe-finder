import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../types/Recipe';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [] as Recipe[], // Specify the initial state type
  reducers: {
    addFavorite: (state, action: PayloadAction<Recipe>) => {
      state.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state));
    },
    removeFavorite: (state, action: PayloadAction<Recipe>) => {
      const updatedFavorites = state.filter(recipe => recipe.id !== action.payload.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update local storage
      return updatedFavorites; // Return the updated state
    },
    loadFavorites: (state) => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        return JSON.parse(savedFavorites); // Load favorites from local storage
      }
      return []; // Return an empty array if no favorites are found
    },
  },
});

// Export actions
export const { addFavorite, removeFavorite, loadFavorites } = favoritesSlice.actions;

// Export reducer
export default favoritesSlice.reducer;