import { firstDiv, secondDiv, thirdDiv , totalPriceDisplay} from "./script.js";
export let selectedElement = null;
export let orders = []
let pizzaDivs; 
let checkOutPrice; 
export let popForm = createPopUpForm ()
export const createFirstDivElements = (pizzaData, allergensData) => {
  // Assign the pizza divs to the `pizzaDivs` variable declared outside the function
    pizzaDivs = pizzaData.map(pizza => {
    const pizzaDiv = document.createElement("div");
    pizzaDiv.classList.add('pizza-item');
    pizzaDiv.classList.add(pizza.name.toLowerCase().replace(/\s+/g, '-'));
    pizzaDiv.classList.add('hover-effect');

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
      // console.log('Selected pizza:', selectedElement);
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
    // console.log(allergenCheckboxes)

  pizzaDivs.forEach((pizzaDiv) => {
    const pizzaName = pizzaDiv.classList[1]; // Assumes the second class in the classList contains the pizza name

    // Get the corresponding pizza object
    const pizza = pizzaData.find(p => p.name.toLowerCase().replace(/\s+/g, '-') === pizzaName);

    const pizzaAllergens = allergensData.filter(allergen => pizza.allergens.includes(allergen.id));

    // console.log(pizzaAllergens)

    const hasAllCheckedAllergens = checkedAllergens.every(checkedAllergen => !pizzaAllergens.find(allergen => allergen.id === checkedAllergen));

    if (hasAllCheckedAllergens) {
      pizzaDiv.classList.add('hover-effect');
    } else {
      pizzaDiv.classList.remove('hover-effect');
    }
  });
});

  
  thirdDiv.appendChild(mainDiv)
  return mainDiv;
};

export const createSecondDivElements = (pizzaObject) => {
  const selectedElementPizza = selectedElement || pizzaObject[0];

  const descriptionDiv = document.createElement('div');
  descriptionDiv.classList.add('description');


  const imgDiv = document.createElement('div');
  imgDiv.classList.add('description__img');

  const img = document.createElement('img');
  img.setAttribute('src', selectedElementPizza.url);
  img.setAttribute('alt', selectedElementPizza.name);

  imgDiv.appendChild(img);

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
    var container = document.createElement("div");
    var pizzaButton = document.createElement("button");
  
    pizzaButton.innerHTML = "🔥 Into The Oven 🔥";
  
    pizzaButton.classList.add("pizza-button")
    pizzaButton.addEventListener('click', function() {
      createthirdDivElements(selectedElement)
    });
    container.appendChild(pizzaButton);
    return container;
  }
  const intoTheOven = createOrderPizzaButton()
  pizzaDescDiv.appendChild(intoTheOven);

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

descriptionDiv.appendChild(imgDiv);
descriptionDiv.appendChild(pizzaDescDiv);
descriptionDiv.appendChild(ingredientsDiv);
// console.log(secondDiv)

secondDiv.appendChild(descriptionDiv)
return descriptionDiv;
};

export const advertisementDiv = () => {
const advertisementDiv = document.createElement('div');
advertisementDiv.classList.add('advertisement-div');

const titleElement = document.createElement('h3');
titleElement.classList.add('advertisement-title');
titleElement.textContent = 'Advertisement Title';
advertisementDiv.appendChild(titleElement);

const paragraphElement = document.createElement('p');
paragraphElement.classList.add('advertisement-paragraph');
paragraphElement.textContent = 'This is a sample advertisement.';
advertisementDiv.appendChild(paragraphElement);

const buttonElement = document.createElement('button');
buttonElement.textContent = 'Click me';
advertisementDiv.appendChild(buttonElement);

const imageElement = document.createElement('img');
imageElement.src = 'pizzaAdd.png';
advertisementDiv.appendChild(imageElement);
// console.log(secondDiv)
secondDiv.appendChild(advertisementDiv);
    return advertisementDiv
}

export const createthirdDivElements = (pizza) =>{

  function createOrderDiv(pizza) {
      // let checkOutPrice;
      const orderDiv = document.createElement('div');
      orderDiv.classList.add('order');

      const nameDiv = document.createElement('div');
      nameDiv.classList.add('order-name');
      nameDiv.textContent = pizza.name;
    
      const priceDiv = document.createElement('div');
      priceDiv.classList.add('order-price');
      priceDiv.textContent = '$' + pizza.price.toFixed(2);

    
      const plusButton = document.createElement('button');
      plusButton.classList.add('plus-button');
      plusButton.textContent = '+';
      plusButton.addEventListener('click', () => {
        if (!pizza.quantity) {
          pizza.quantity = 1;
        } else {
          pizza.quantity++;
        }

        if (!orders.find(order => order.id === pizza.id)){
          orders.push(pizza)
        }

        quantityDiv.textContent = pizza.quantity;
         checkOutPrice = (pizza.price * pizza.quantity).toFixed(2);
        priceDiv.textContent = '$' + checkOutPrice;
      
        // const orderIndex = orders.findIndex(order => order.name === pizza.name);
        
        // totalPriceDisplay.textContent = ""
        totalPriceDisplay.textContent = orders.reduce((totalPrice, order) => {
          return totalPrice + order.price * order.quantity
        },0).toFixed(2)

        // console.log(orders);
      });
      
      
    
    
      const minusButton = document.createElement('button');
      minusButton.classList.add('minus-button');
      minusButton.textContent = '-';
      minusButton.addEventListener('click', () => {
        if (!pizza.quantity) {
          pizza.quantity = 1;
        } else {
          pizza.quantity--;
        }
        quantityDiv.textContent = pizza.quantity;
      
        checkOutPrice =  (pizza.price * pizza.quantity).toFixed(2);
        priceDiv.textContent = '$' + checkOutPrice;
      
        // totalPriceDisplay.textContent = ""
        totalPriceDisplay.textContent = orders.reduce((totalPrice, order) => {
          return totalPrice + order.price * order.quantity
        },0).toFixed(2)

      });

      // change the total price display 
      const quantityDiv = document.createElement('div');
      quantityDiv.classList.add('order-quantity');
      quantityDiv.textContent = pizza.quantity;
    
      orderDiv.appendChild(nameDiv);
      orderDiv.appendChild(priceDiv);
      orderDiv.appendChild(quantityDiv);
      orderDiv.appendChild(plusButton);
      orderDiv.appendChild(minusButton);
      thirdDiv.appendChild(orderDiv)
      // return orderDiv;

  }
  createOrderDiv(pizza)


  
 
}

function createPopUpForm (){
  const container = document.createElement("div")
  container.classList.add("popup-modal")
  container.hidden = true
  document.body.appendChild(container)
  
  return container
}
createPopUpForm ()
  