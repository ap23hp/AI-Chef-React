export async function handler(event) {
  try {
    const { ingredients } = JSON.parse(event.body);
    const ingredientsString = ingredients.join(", ");

    const SYSTEM_PROMPT = `
You are a friendly chef. Create a simple, tasty recipe
using the given ingredients. Use clean markdown. 
Keep steps beginner-friendly.
    `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct",

          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Ingredients: ${ingredientsString}\nCreate a recipe.`,
            },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      }
    );

    const data = await response.json();
    console.log("OpenRouter Response:", data);
    if (!data.choices) {
      throw new Error(data.error?.message || "No response from OpenRouter");
    }

    const recipe = data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ recipe }),
    };
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
