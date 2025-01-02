import { Recipe } from '../types/Recipe'; 

interface RecipeDetailProps {
  recipe: Recipe; 
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe }) => {
  const shareRecipe = () => {
    const url = `https://yourwebsite.com/recipe/${recipe.id}`;
    const text = `Check out this recipe: ${recipe.title}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <div className="p-4">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded" />
      <h1 className="text-2xl font-bold mt-4">{recipe.title}</h1>
      <h2 className="mt-2">Ingredients:</h2>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((ingredient: string, index: number) => ( 
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <h2 className="mt-2">Steps:</h2>
      <ol className="list-decimal pl-5">
        {recipe.steps.map((step: string, index: number) => ( 
          <li key={index}>{step}</li>
        ))}
      </ol>
      <div className="mt-4">
        <button className="bg-blue-500 text-white p-2 rounded">Save to Favorites</button>
      </div>
      <button onClick={shareRecipe} className="bg-blue-500 text-white p-2 rounded">Share on Twitter</button>
    </div>
  );
};

export default RecipeDetail;