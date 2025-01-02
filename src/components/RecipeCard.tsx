import { Recipe } from '../types/Recipe'; 
import Link from 'next/link'; 

interface RecipeCardProps {
  recipe: Recipe; 
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <div className="border rounded-lg p-4">
      <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover rounded-t-lg" />
      <h3 className="text-lg font-semibold mt-2">{recipe.title}</h3>
      <Link href={`/recipe/${recipe.id}`}>
        <p className="text-blue-500 hover:underline">View Recipe</p>
      </Link>
    </div>
  );
};

export default RecipeCard;