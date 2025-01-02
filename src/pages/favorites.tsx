import Navbar from '../components/Navbar';
import FavoritesList from '../components/FavoritesList';

const FavoritesPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Your Favorites</h1>
      <FavoritesList />
    </div>
  );
};

export default FavoritesPage;