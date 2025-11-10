import { useState } from "react";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [status, setStatus] = useState("idle");
  const [recipeText, setRecipeText] = useState("");

  let ingredientsList = ingredients.map((ingredient, index) => {
    return <li key={index}>{ingredient}</li>;
  });

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient");
    if (!newIngredient) return;
    setIngredients((prev) => [...prev, newIngredient]);
  }

  async function getRecipe(ingredients) {
    const response = await fetch("/.netlify/functions/getRecipe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ingredients }),
    });

    const data = await response.json();
    return data.recipe;
  }
  async function handleGetRecipe() {
    setStatus("loading");

    try {
      const recipe = await getRecipe(ingredients);
      setRecipeText(recipe);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setRecipeText("Something went wrong. Please try again.");
      setStatus("error");
    }
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

      {ingredients.length > 0 && (
        <section className="section1">
          <h2>Ingredients on hand:</h2>
          <ul className="ingredients-list" aria-live="polite">
            {ingredientsList}
          </ul>

          {ingredients.length > 3 && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
              </div>
              <button onClick={handleGetRecipe}>Get a recipe</button>
            </div>
          )}
        </section>
      )}

      <section className="section2">
        {status === "loading" && (
          <h2 className="loadingText">AI chef is thinking....</h2>
        )}

        {status === "success" && <h2>AI Chef Recommends:</h2>}

        {status === "success" && (
          <article className="suggested-recipe-container" aria-live="polite">
            {recipeText}
          </article>
        )}
      </section>
    </main>
  );
}
