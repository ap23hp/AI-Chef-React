import { useState } from "react";
import ReactMarkdown from "react-markdown";
import chefLoading from "../assets/images/chef-cooking.gif";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [status, setStatus] = useState("idle");
  const [recipeText, setRecipeText] = useState("");

  let ingredientsList = ingredients.map((ingredient, index) => {
    return <li key={index}>{ingredient}</li>;
  });

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();

    //Validation rules
    if (newIngredient.length < 2) return; // prevent 1-letter
    if (!/^[a-zA-Z ]+$/.test(newIngredient)) return; // only letters & spaces
    if (ingredients.includes(newIngredient.toLowerCase())) return; // prevent duplicates

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
      {ingredients.length === 0 && status === "idle" && (
        <div className="empty-bg"></div>
      )}

      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. oregano"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add ingredient</button>

        {status === "success" && (
          <button
            type="button"
            className="start-over-btn"
            onClick={() => {
              setIngredients([]);
              setRecipeText("");
              setStatus("idle");
            }}
          >
            Start Over
          </button>
        )}
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
          <div className="chef-loader">
            <img src={chefLoading} alt="AI Chef cooking..." />
            <p>AI Chef is cooking your recipe…</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="top-bar">
              <h2>AI Chef Recommends:</h2>
            </div>

            <article className="suggested-recipe-container" aria-live="polite">
              <ReactMarkdown>{recipeText}</ReactMarkdown>
            </article>
          </>
        )}
      </section>
    </main>
  );
}
