import fs from "node:fs/promises"
import { v4 as uuid } from "uuid"

const data = JSON.parse(await fs.readFile("/data/originals/pizza_raw_data.json", { encoding: "utf-8" }))
const allergensData = JSON.parse(await fs.readFile("/data/originals/allergens.json", { encoding: "utf-8" }))

const pizzas = []
const ingredients = []

function addIngredient(ingredient) {
	if (getIngredient(ingredient)) return

	ingredients.push({
		id: uuid(),
		name: ingredient[0].toUpperCase() + ingredient.slice(1),
		allergens: []
	})
}
function getIngredient(ingredient) {
	return ingredients.find((i) => i.name.toLowerCase() === ingredient.toLowerCase())
}

for (const pizza of data) {
	for (const ingredient of pizza.ingredients) {
		addIngredient(ingredient)
	}

	pizzas.push({
		id: uuid(),
		name: pizza.name,
		order: pizzas.length,
		image: pizza.name.replace(/\W+/, "_").toLowerCase() + ".png",
		ingredients: pizza.ingredients.map(getIngredient).map((i) => i.id),
		price: (pizza.price - 5) / 100
	})
}

fs.writeFile("/data/pizza.json", JSON.stringify(pizzas, null, 2))
fs.writeFile("/data/ingredients.json", JSON.stringify(ingredients, null, 2))
