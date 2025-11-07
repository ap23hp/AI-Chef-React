import { useState } from "react";

export default function Main() {
  //const ingredients = ["Chicken", "Oregano", "Tomatoes"];
  const [ingredients, setIngredients] = useState([]);
  const [status,setStatus]=useState("idle")
  const [recipeText,setRecipeText]=useState("")
  let ingredientsList = ingredients.map((ingredient) => {
    return <li>{ingredient}</li>;
  });

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    setIngredients((prevIngredient) => [...prevIngredient, newIngredient]);
  }

  function handleGetRecipe(){
    setStatus("loading")
    setTimeout(()=>{
  setRecipeText("this is recipe from ai")
  setStatus("success")
    },2000)
  
  }
  return (
    <main>
      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button>Add ingredient</button>
      </form>
    {ingredients.length > 0 && <section className="section1">
                <h2>Ingredients on hand:</h2>
                <ul className="ingredients-list" aria-live="polite">{ingredientsList}</ul>
                {ingredients.length > 3 && <div className="get-recipe-container">
                    <div>
                        <h3>Ready for a recipe?</h3>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>
                    <button onClick={handleGetRecipe}>Get a recipe</button>
                </div>}
            </section>}
            
            <section className="section2">
              {status==="loading" &&  <h2 className="loadingText">AI chef is thinking....</h2> }
              
               {status==="success" &&  <h2>Chef Claude Recommends:</h2>}
                {status==="success" &&   <article className="suggested-recipe-container" aria-live="polite">
                   {recipeText}
                </article>}
            </section>
    </main>
  );
}
