import { mainDescriptionDiv, mainFilterDiv } from "./script.js"
export let selectedElement = null
export let orders = []
const totalPriceDisplay = document.createElement("div")
let popForm = createPopUpForm()
let pizzaDivs
let checkOutPrice

export const createFirstDivElements = (pizzaData, allergensData) => {
	// Assign the pizza divs to the `pizzaDivs` variable declared outside the function
	pizzaDivs = pizzaData.map(pizza => {
		const pizzaDiv = document.createElement("div")
		pizzaDiv.classList.add("pizza-item")
		pizzaDiv.classList.add(pizza.name.toLowerCase().replace(/\s+/g, "-"))
		pizzaDiv.classList.add("hover-effect")

		const pizzaName = document.createElement("h3")
		pizzaName.textContent = pizza.name
		pizzaDiv.appendChild(pizzaName)

		const pizzaPrice = document.createElement("p")
		pizzaPrice.textContent = `Price: $${pizza.price}`
		pizzaDiv.appendChild(pizzaPrice)

		// Check for allergens and add class to pizza div if it contains allergens
		const pizzaAllergens = allergensData.filter(allergen => pizza.allergens.includes(allergen.id))
		if (pizzaAllergens.length > 0) {
			pizzaDiv.classList.add("has-allergens")
		}

		// Add click event listener to the pizza div
		pizzaDiv.addEventListener("click", () => {
			selectedElement = pizza
			// console.log('Selected pizza:', selectedElement);
			const existingDescriptionDiv = document.querySelector(".description")
			if (existingDescriptionDiv) {
				existingDescriptionDiv.remove()
			}
			const descriptionDiv = createSecondDivElements(pizzaData)
			const pizzaContainer = document.querySelector(".pizza-container")
			if (pizzaContainer) {
				pizzaContainer.appendChild(descriptionDiv)
			}
		})

		return pizzaDiv
	})
	// pizzaDivs.forEach(div => { firstDiv.appendChild(div)})

	return pizzaDivs
}
export const createSecondDivElements = pizzaObject => {
	const selectedElementPizza = selectedElement || pizzaObject[0]

	const descriptionDiv = document.createElement("div")
	descriptionDiv.classList.add("description")

	const imgDiv = document.createElement("div")
	imgDiv.classList.add("description__img")

	const img = document.createElement("img")
	img.setAttribute("src", selectedElementPizza.url)
	img.setAttribute("alt", selectedElementPizza.name)

	// imgDiv.appendChild(img)

	const pizzaDescDiv = document.createElement("div")
	pizzaDescDiv.classList.add("description__pizza-desc")

	const pizzaName = document.createElement("h2")
	pizzaName.textContent = selectedElementPizza.name

	const pizzaPrice = document.createElement("p")
	pizzaPrice.classList.add("description__price")
	pizzaPrice.textContent = `$${selectedElementPizza.price}`

	const pizzaDescription = document.createElement("p")
	pizzaDescription.textContent = selectedElementPizza.description

	pizzaDescDiv.appendChild(pizzaName)
	pizzaDescDiv.appendChild(pizzaPrice)
	pizzaDescDiv.appendChild(pizzaDescription)

	const intoTheOvenDiv = document.createElement("div")
	const intoTheOvenButton = document.createElement("button")
	intoTheOvenButton.textContent = "🔥 Into The Oven 🔥"
	intoTheOvenButton.classList.add("pizza-button")
	intoTheOvenButton.onclick = () => createthirdDivElements(selectedElement)
	intoTheOvenDiv.appendChild(intoTheOvenButton)

	pizzaDescDiv.appendChild(intoTheOvenDiv)

	const ingredientsDiv = document.createElement("div")
	ingredientsDiv.classList.add("description__ingredients")

	const ingredientsTitle = document.createElement("h3")
	ingredientsTitle.textContent = "Ingredients:"

	const ingredientsList = document.createElement("ul")

	selectedElementPizza.ingredients.forEach(ingredient => {
		const ingredientItem = document.createElement("li")
		ingredientItem.textContent = ingredient.name
		ingredientsList.appendChild(ingredientItem)
	})

	ingredientsDiv.appendChild(ingredientsTitle)
	ingredientsDiv.appendChild(ingredientsList)

	descriptionDiv.appendChild(img)
	descriptionDiv.appendChild(pizzaDescDiv)
	descriptionDiv.appendChild(ingredientsDiv)

	mainDescriptionDiv.appendChild(descriptionDiv) // is appended twice the first time with pizaData[0]  then with selectedDiv
	return descriptionDiv
}
export const createthirdDivElements = pizza => {
	const createOrderDivAndElements = pizza => {
		orders.push(pizza) // this is done to insure no repetative entries

		const orderDiv = document.createElement("div")
		orderDiv.classList.add("order")

		const nameDiv = document.createElement("div")
		nameDiv.classList.add("order-name")
		nameDiv.textContent = pizza.name

		const priceDiv = document.createElement("div")
		priceDiv.classList.add("order-price")
		priceDiv.textContent = "$" + pizza.price.toFixed(2)

		const plusButton = document.createElement("button")
		plusButton.classList.add("plus-button")
		plusButton.textContent = "+"
		plusButton.addEventListener("click", () => {
			if (!pizza.quantity) {
				pizza.quantity = 1
			} else {
				pizza.quantity++
			}

			if (!orders.find(order => order.id === pizza.id)) {
				orders.push(pizza)
			}

			quantityDiv.textContent = pizza.quantity
			checkOutPrice = (pizza.price * pizza.quantity).toFixed(2)
			priceDiv.textContent = "$" + checkOutPrice
			totalPriceDisplay.textContent = orders
				.reduce((totalPrice, order) => {
					return totalPrice + order.price * order.quantity
				}, 0)
				.toFixed(2)
		})

		const minusButton = document.createElement("button")
		minusButton.classList.add("minus-button")
		minusButton.textContent = "-"
		minusButton.addEventListener("click", () => {
			if (!pizza.quantity) {
				pizza.quantity = 1
			} else {
				pizza.quantity--
			}

			quantityDiv.textContent = pizza.quantity
			checkOutPrice = (pizza.price * pizza.quantity).toFixed(2)
			priceDiv.textContent = "$" + checkOutPrice

			totalPriceDisplay.textContent = orders
				.reduce((totalPrice, order) => {
					return totalPrice + order.price * order.quantity
				}, 0)
				.toFixed(2)
		})

		// change the total price display
		const quantityDiv = document.createElement("div")
		quantityDiv.classList.add("order-quantity")
		quantityDiv.textContent = pizza.quantity

		orderDiv.appendChild(nameDiv)
		orderDiv.appendChild(priceDiv)
		orderDiv.appendChild(quantityDiv)
		orderDiv.appendChild(plusButton)
		orderDiv.appendChild(minusButton)
		mainFilterDiv.appendChild(orderDiv)
	}
	// check if a pizza order dev is already created
	if (!orders.find(order => order.name === pizza.name)) {
		createOrderDivAndElements(pizza)
	}
}

export const createAllergensFilter = (pizzaData, allergensData) => {
	const mainDiv = document.createElement("div")
	mainDiv.classList.add("filter-div")

	const allergenCheckboxes = document.createElement("div")
	allergenCheckboxes.appendChild(document.createTextNode("Allergens: "))

	// Loop through the allergens data and create a checkbox and label for each allergen
	allergensData.forEach(allergen => {
		const checkbox = document.createElement("input")
		checkbox.type = "checkbox"
		checkbox.id = `allergen-${allergen.id}`
		checkbox.dataset.allergenId = allergen.id

		const label = document.createElement("label")
		label.htmlFor = `allergen-${allergen.id}`
		label.textContent = allergen.name

		allergenCheckboxes.appendChild(checkbox)
		allergenCheckboxes.appendChild(label)
	})

	mainDiv.appendChild(allergenCheckboxes)

	// Add an event listener to the allergen checkboxes
	allergenCheckboxes.addEventListener("change", () => {
		// Get an array of the IDs of all checked allergen checkboxes
		const checkedAllergens = Array.from(allergenCheckboxes.querySelectorAll("input:checked")).map(
			checkbox => checkbox.dataset.allergenId
		)

		// Loop through each pizza div and check if it has all the checked allergens
		pizzaDivs.forEach(pizzaDiv => {
			const pizzaName = pizzaDiv.classList[1] //the second class in the classList contains the pizza name

			// Get the corresponding pizza object
			const pizza = pizzaData.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === pizzaName)

			// Get an array of allergen objects that the pizza has
			const pizzaAllergens = allergensData.filter(allergen => pizza.allergens.includes(allergen.id))

			// Check if the pizza has all the checked allergens
			const hasAllCheckedAllergens = checkedAllergens.every(
				checkedAllergen => !pizzaAllergens.find(allergen => allergen.id === checkedAllergen)
			)

			// Add or remove a hover effect class depending on whether the pizza has all the checked allergens
			if (hasAllCheckedAllergens) {
				pizzaDiv.classList.add("hover-effect")
			} else {
				pizzaDiv.classList.remove("hover-effect")
			}
		})
	})

	// Add the main div to the page and return it
	mainFilterDiv.appendChild(mainDiv)
	return mainDiv
}
export const createCheckoutDivs = orders => {
	// console.log(orders)
	const checkOutDiv = document.createElement("div")
	checkOutDiv.classList.add("checkout-div")

	totalPriceDisplay.classList.add("checkout-price")
	totalPriceDisplay.textContent = 0

	const checkOutButton = document.createElement("button")
	checkOutButton.onclick = () => (popForm.hidden = false)
	checkOutButton.classList.add("checkout-button")
	checkOutButton.textContent = "CheckOut"

	checkOutButton.appendChild(totalPriceDisplay)
	checkOutDiv.appendChild(checkOutButton)

	mainFilterDiv.appendChild(checkOutDiv)
}
function createPopUpForm() {
	const containerBody = document.createElement("div")
	containerBody.classList.add("popup-modal")
	containerBody.hidden = true
	document.body.appendChild(containerBody)

	function createOrderForm() {
		const title = document.createElement("h2")
		title.classList.add("title-form")
		title.textContent = "Pizza Order Form"
		containerBody.appendChild(title)

		const form = document.createElement("form")
		form.classList.add("form")
		form.addEventListener("submit", function (event) {
			event.preventDefault() // prevent page reload on form submission

      const customerInfo = {
				name: nameInput.value,
				email: emailInput.value,
				phone: phoneInput.value,
				address: addressInput.value
			}
			sendOrdersToServer(customerInfo)
			popForm.hidden = true
		})

		const nameLabel = document.createElement("label")
		nameLabel.textContent = "Name:"
		const nameInput = document.createElement("input")
		nameInput.type = "text"
		nameInput.name = "name"
		form.appendChild(nameLabel)
		form.appendChild(nameInput)

		const emailLabel = document.createElement("label")
		emailLabel.textContent = "Email:"
		const emailInput = document.createElement("input")
		emailInput.type = "email"
		emailInput.name = "email"
		form.appendChild(emailLabel)
		form.appendChild(emailInput)

		const phoneLabel = document.createElement("label")
		phoneLabel.textContent = "Phone number:"
		const phoneInput = document.createElement("input")
		phoneInput.type = "tel"
		phoneInput.name = "phone"
		form.appendChild(phoneLabel)
		form.appendChild(phoneInput)

		const addressLabel = document.createElement("label")
		addressLabel.textContent = "Address:"
		const addressInput = document.createElement("input")
		addressInput.type = "text"
		addressInput.name = "address"
		form.appendChild(addressLabel)
		form.appendChild(addressInput)

		const submitButton = document.createElement("button")
		submitButton.classList.add("submit-button")
		submitButton.type = "submit"
		submitButton.textContent = "Submit"
		form.appendChild(submitButton)

		containerBody.appendChild(form)
	}
	createOrderForm()
	return containerBody
}
createPopUpForm()

function sendOrdersToServer(customerInfo) {
	fetch("/api/orders", {
		method: "POST",
		body: JSON.stringify({ customerInfo, order: orders.map(order => ({ id: order.id, amount: order.quantity })) }),
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.error(error))
}
