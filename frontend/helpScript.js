import { rootDiv } from "./script.js";

export let selectedElement = null;



export const createFirstDivElements = (pizzaObject) => {
  const pizzaDivs = pizzaObject.map(pizza => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add("pizza-item");

    const pizzaName = document.createElement("h3");
    pizzaName.textContent = pizza.name;
    pizzaDiv.appendChild(pizzaName);

    const pizzaPrice = document.createElement("p");
    pizzaPrice.textContent = `Price: $${pizza.price}`;
    pizzaDiv.appendChild(pizzaPrice);

    // Add click event listener to the pizza div
    pizzaDiv.addEventListener('click', () => {
      selectedElement = pizza;
      console.log('Selected pizza:', selectedElement);
      const existingDescriptionDiv = document.querySelector('.description');
      if (existingDescriptionDiv) {
        existingDescriptionDiv.remove();
      }
      const descriptionDiv = createSecondDivElements(pizzaObject);
      const pizzaContainer = document.querySelector('.pizza-container');
      if (pizzaContainer) {
        pizzaContainer.appendChild(descriptionDiv);
      }
    });

    return pizzaDiv;
  });
  return pizzaDivs;
};

export const createSecondDivElements = (pizzaObject) => {
  const selectedElementPizza = selectedElement || pizzaObject[0];

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('description');

  // create img div
  const imgDiv = document.createElement('div');
  imgDiv.classList.add('description__img');

  const img = document.createElement('img');
  img.setAttribute('src', selectedElementPizza.url);
  img.setAttribute('alt', selectedElementPizza.name);

  imgDiv.appendChild(img);

  // create pizza description div
  const pizzaDescDiv = document.createElement('div');
  pizzaDescDiv.classList.add('description__pizza-desc');

  const pizzaName = document.createElement('h2');
  pizzaName.textContent = selectedElementPizza.name;

  const pizzaPrice = document.createElement('p');
  pizzaPrice.classList.add('description__price');
  pizzaPrice.textContent = `$${selectedElementPizza.price}`;

  const pizzaDescription = document.createElement('p');
  pizzaDescription.textContent = selectedElementPizza.description;

  pizzaDescDiv.appendChild(pizzaName);
  pizzaDescDiv.appendChild(pizzaPrice);
  pizzaDescDiv.appendChild(pizzaDescription);

  // create ingredients div
  const ingredientsDiv = document.createElement('div');
  ingredientsDiv.classList.add('description__ingredients');

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients:';

  const ingredientsList = document.createElement('ul');

  selectedElementPizza.ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement('li');
    ingredientItem.textContent = ingredient;
    ingredientsList.appendChild(ingredientItem);
});

ingredientsDiv.appendChild(ingredientsTitle);
ingredientsDiv.appendChild(ingredientsList);

// append all divs to parent div
descriptionDiv.appendChild(imgDiv);
descriptionDiv.appendChild(pizzaDescDiv);
descriptionDiv.appendChild(ingredientsDiv);

rootDiv.appendChild(descriptionDiv)
// createSecondDiv()
return descriptionDiv;
};
