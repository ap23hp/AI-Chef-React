import { useState } from "react";
import ReactMarkdown from "react-markdown";
import chefLoading from "../assets/images/chef-cooking.gif";

export default function Main() {
  const [ingredients, setIngredients] = useState([]);
  const [status, setStatus] = useState("idle");
  const [recipeText, setRecipeText] = useState("");

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient}</li>
  ));

  function addIngredient(formData) {
    const newIngredient = formData.get("ingredient").trim();
    if (newIngredient.length < 2) return;
    if (!/^[a-zA-Z ]+$/.test(newIngredient)) return;
    if (ingredients.includes(newIngredient.toLowerCase())) return;
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

  function handleStartOver() {
    setIngredients([]);
    setRecipeText("");
    setStatus("idle");
  }

  return (
    <main>
    <p className="prompt-label">
        What&apos;s in your <span>kitchen?</span>
      </p>
      <p className="prompt-sub">
        Toss in what you&apos;ve got — we&apos;ll make something delicious.
      </p>

      <form action={addIngredient} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. garlic, eggs, thyme…"
          aria-label="Add ingredient"
          name="ingredient"
        />
        <button type="submit">Add</button>
      </form>

      {status === "success" && (
        <button type="button" className="start-over-btn" onClick={handleStartOver}>
          ↩ start over
        </button>
      )}

      {ingredients.length > 0 && (
        <section className="section1">
          <div className="section1-header">
            <h2>Ingredients on hand</h2>
            <span className="badge-count">{ingredients.length}</span>
          </div>

          <ul className="ingredients-list" aria-live="polite">
            {ingredientsList}
          </ul>

          {ingredients.length > 3 && status !== "success" && status !== "loading" && (
            <div className="get-recipe-container">
              <div>
                <h3>Ready to cook? ✦</h3>
                <p>Generate a recipe from your ingredients.</p>
              </div>
              <button onClick={handleGetRecipe}>Get a recipe →</button>
            </div>
          )}
        </section>
      )}

      <section className="section2">
        {status === "loading" && (
          <div className="chef-loader">
            <img src={chefLoading} alt="AI Chef is cooking…" />
            <p>Cooking something up…</p>
          </div>
        )}

        {status === "success" && (
          <>
            <div className="top-bar">
              <span className="star-deco">✦</span>
              <h2>Your Recipe</h2>
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
