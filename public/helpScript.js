import { secondDiv, thirdDiv} from "./script.js";
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
    ingredientItem.textContent = ingredient.name;
    ingredientsList.appendChild(ingredientItem);
});

ingredientsDiv.appendChild(ingredientsTitle);
ingredientsDiv.appendChild(ingredientsList);

// append all divs to parent div
descriptionDiv.appendChild(imgDiv);
descriptionDiv.appendChild(pizzaDescDiv);
descriptionDiv.appendChild(ingredientsDiv);
console.log(secondDiv)

secondDiv.appendChild(descriptionDiv)
// const advetisementToAppend = advertisementDiv()
// rootDiv.appendChild(advetisementToAppend)
// createSecondDiv()
return descriptionDiv;
};

export const advertisementDiv = () => {
// container div element
const advertisementDiv = document.createElement('div');
advertisementDiv.classList.add('advertisement-div');

// h3 element for title
const titleElement = document.createElement('h3');
titleElement.classList.add('advertisement-title');
titleElement.textContent = 'Advertisement Title';
advertisementDiv.appendChild(titleElement);

// p element for paragraph
const paragraphElement = document.createElement('p');
paragraphElement.classList.add('advertisement-paragraph');
paragraphElement.textContent = 'This is a sample advertisement.';
advertisementDiv.appendChild(paragraphElement);

//  button element
const buttonElement = document.createElement('button');
buttonElement.textContent = 'Click me';
advertisementDiv.appendChild(buttonElement);

//  img element for image
const imageElement = document.createElement('img');
imageElement.src = 'pizzaAdd.png'; // Replace with the actual image source
advertisementDiv.appendChild(imageElement);
console.log(secondDiv)
// Append the advertisementDiv to the DOM
secondDiv.appendChild(advertisementDiv);
    return advertisementDiv
}






export const createAllergensFilter = (pizzaData, allergensData) => {
  const mainDiv = document.createElement('div');
  const allergenCheckboxes = document.createElement('div');
  const pizzaList = document.createElement('ul');

  allergenCheckboxes.appendChild(document.createTextNode('Allergens: '));

  allergensData.forEach((allergen) => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `allergen-${allergen.id}`;
    checkbox.dataset.allergenId = allergen.id;

    const label = document.createElement('label');
    label.htmlFor = `allergen-${allergen.id}`;
    label.textContent = allergen.name;

    allergenCheckboxes.appendChild(checkbox);
    allergenCheckboxes.appendChild(label);
  });

  pizzaData.forEach((pizza) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${pizza.name} - ${pizza.ingredients.join(', ')}`;
    pizzaList.appendChild(listItem);
  });

  mainDiv.appendChild(allergenCheckboxes);
  mainDiv.appendChild(pizzaList);

  allergenCheckboxes.addEventListener('change', () => {
    const checkedAllergens = Array.from(
      allergenCheckboxes.querySelectorAll('input:checked')
    ).map((checkbox) => parseInt(checkbox.dataset.allergenId));

    const filteredPizzas = pizzaData.filter((pizza) => {
      return checkedAllergens.every((allergenId) => !pizza.allergens.includes(allergenId));
    });

    pizzaList.innerHTML = '';

    filteredPizzas.forEach((pizza) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${pizza.name} - ${pizza.ingredients.join(', ')}`;
      pizzaList.appendChild(listItem);
    });
  });
  thirdDiv.appendChild(mainDiv)
  return mainDiv;
};
