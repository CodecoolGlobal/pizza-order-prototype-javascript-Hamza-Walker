import { firstDiv, secondDiv, thirdDiv} from "./script.js";
export let selectedElement = null;
let pizzaDivs; 


// export const createFirstDivElements = (pizzaObject) => {
//   const pizzaDivs = pizzaObject.map(pizza => {
//     const pizzaDiv = document.createElement("div");
//     pizzaDiv.classList.add("pizza-item");

//     const pizzaName = document.createElement("h3");
//     pizzaName.textContent = pizza.name;
//     pizzaDiv.appendChild(pizzaName);

//     const pizzaPrice = document.createElement("p");
//     pizzaPrice.textContent = `Price: $${pizza.price}`;
//     pizzaDiv.appendChild(pizzaPrice);

//     // Add click event listener to the pizza div
//     pizzaDiv.addEventListener('click', () => {
//       selectedElement = pizza;
//       console.log('Selected pizza:', selectedElement);
//       const existingDescriptionDiv = document.querySelector('.description');
//       if (existingDescriptionDiv) {
//         existingDescriptionDiv.remove();
//       }
//       const descriptionDiv = createSecondDivElements(pizzaObject);
//       const pizzaContainer = document.querySelector('.pizza-container');
//       if (pizzaContainer) {
//         pizzaContainer.appendChild(descriptionDiv);
//       }
//     });

//     return pizzaDiv;
//   });
//   return pizzaDivs;
// };


export const createFirstDivElements = (pizzaData, allergensData) => {
  // Assign the pizza divs to the `pizzaDivs` variable declared outside the function
    pizzaDivs = pizzaData.map(pizza => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add('pizza-item');
    pizzaDiv.classList.add(pizza.name.toLowerCase().replace(/\s+/g, '-'));

    const pizzaName = document.createElement("h3");
    pizzaName.textContent = pizza.name;
    pizzaDiv.appendChild(pizzaName);

    const pizzaPrice = document.createElement("p");
    pizzaPrice.textContent = `Price: $${pizza.price}`;
    pizzaDiv.appendChild(pizzaPrice);

    // Check for allergens and add class to pizza div if it contains allergens
    const pizzaAllergens = allergensData.filter(allergen => pizza.allergens.includes(allergen.id));
    if (pizzaAllergens.length > 0) {
      pizzaDiv.classList.add("has-allergens");
    }

    // Add click event listener to the pizza div
    pizzaDiv.addEventListener('click', () => {
      selectedElement = pizza;
      console.log('Selected pizza:', selectedElement);
      const existingDescriptionDiv = document.querySelector('.description');
      if (existingDescriptionDiv) {
        existingDescriptionDiv.remove();
      }
      const descriptionDiv = createSecondDivElements(pizzaData);
      const pizzaContainer = document.querySelector('.pizza-container');
      if (pizzaContainer) {
        pizzaContainer.appendChild(descriptionDiv);
      }
    });

    return pizzaDiv;
  });
  // pizzaDivs.forEach(div => { firstDiv.appendChild(div)})
  
  return pizzaDivs;
};

export const createAllergensFilter = (pizzaData, allergensData) => {
  const mainDiv = document.createElement('div');
  const allergenCheckboxes = document.createElement('div');

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

  mainDiv.appendChild(allergenCheckboxes);

  // Add event listener to the allergen checkboxes
  allergenCheckboxes.addEventListener('change', () => {
    const checkedAllergens = Array.from(
      allergenCheckboxes.querySelectorAll('input:checked')
    ).map((checkbox) => checkbox.dataset.allergenId);
      console.log(allergenCheckboxes)
  
    pizzaDivs.forEach((pizzaDiv) => {
      const pizzaName = pizzaDiv.classList[1]; // Assumes the second class in the classList contains the pizza name
  
      // Get the corresponding pizza object
      const pizza = pizzaData.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === pizzaName);
  
      const pizzaAllergens = allergensData.filter(allergen => pizza.allergens.includes(allergen.id));
  
      console.log(pizzaAllergens)
  
      const hasAllCheckedAllergens = checkedAllergens.every(checkedAllergen => !pizzaAllergens.find(allergen => allergen.id === checkedAllergen));
  
      if (hasAllCheckedAllergens) {
        pizzaDiv.classList.add('hover-effect');
      } else {
        pizzaDiv.classList.remove('hover-effect');
      }
    });
  });

  thirdDiv.appendChild(mainDiv);
  return mainDiv;
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

  function createOrderPizzaButton() {
    // create div element
    var container = document.createElement("div");
    // create button element
    var pizzaButton = document.createElement("button");
  
    // set button text
    pizzaButton.innerHTML = "🔥 Into The Oven 🔥";
  
    // set button class
    pizzaButton.classList.add("pizza-button")
    pizzaButton.addEventListener('click', function() {
      // intoTheOven(selectedElement)
      createthirdDivElements(selectedElement)
    });
    // add button to div
    container.appendChild(pizzaButton);
    // return div
    return container;
  }
  const intoTheOven = createOrderPizzaButton()
  pizzaDescDiv.appendChild(intoTheOven);

  // create ingredients div
  const ingredientsDiv = document.createElement('div');
  ingredientsDiv.classList.add('description__ingredients');

  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients:';

  const ingredientsList = document.createElement('ul');

  selectedElementPizza.ingredients.forEach((ingredient) => {
    // console.log(ingredient)
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

export const createthirdDivElements = (pizza) =>{

function createOrderDiv(pizza) {
    // Create the outer div
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');
  
    // Create the name and price divs
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('order-name');
    nameDiv.textContent = pizza.name;
  
    const priceDiv = document.createElement('div');
    priceDiv.classList.add('order-price');
    priceDiv.textContent = '$' + pizza.price.toFixed(2);
  
    // Create the plus and minus buttons
    const plusButton = document.createElement('button');
    plusButton.classList.add('plus-button');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', () => {
      pizza.quantity++;
      quantityDiv.textContent = pizza.quantity;
      priceDiv.textContent = '$' + (pizza.price * pizza.quantity).toFixed(2);
    });
  
    const minusButton = document.createElement('button');
    minusButton.classList.add('minus-button');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', () => {
      if (pizza.quantity > 1) {
        pizza.quantity--;
        quantityDiv.textContent = pizza.quantity;
        priceDiv.textContent = '$' + (pizza.price * pizza.quantity).toFixed(2);
      }
    });
  
    // Create the quantity div
    const quantityDiv = document.createElement('div');
    quantityDiv.classList.add('order-quantity');
    quantityDiv.textContent = pizza.quantity;
  
    // Add the name, price, quantity, plus, and minus elements to the order div
    orderDiv.appendChild(nameDiv);
    orderDiv.appendChild(priceDiv);
    orderDiv.appendChild(quantityDiv);
    orderDiv.appendChild(plusButton);
    orderDiv.appendChild(minusButton);
    thirdDiv.appendChild(orderDiv)
    // Return the order div
    return orderDiv;

}
 createOrderDiv(pizza)
}





// checkedAllergens.forEach(allergin => {
    //   pizzaDivs.forEach(pizzaDiv => {
    //     const pizzaName = pizzaDiv.classList[1];
    //     const matchDivIfAllergenInPizza = pizzaName.map(name => pizzaData.forEach(piza => {
    //       if(piza.allergens.includes(allergin)){
    //         return piza.name
    //       }
           
    //     }))
    //     return pizzaDiv
    //   })
    // })