export interface Recipe {
    extendedIngredients: any;
    instructions:string ;
    id: number|string;
    title: string;
    image: string;
    readyInMinutes: number;
    servings: number;
    description?: string; 
    summary?: string;
    ingredients: string[]; 
    steps: string[]; 
  }
