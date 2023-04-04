import { createFirstDivElements , createSecondDivElements } from "./helpScript.js";
import { fetchPizzaObject, pizzaObject, fetchallergensObject , allergensObject } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");

const createFirstDiv = () => {
    const firstDiv = document.createElement("div");
    firstDiv.classList.add("pizza-menu")
    // firstDiv.textContent = "put the pizza menu on me"

    const pizzaDivs = createFirstDivElements(pizzaObject);
    pizzaDivs.forEach(pizzaDiv => {
        firstDiv.appendChild(pizzaDiv);
    });
    
    rootDiv.appendChild(firstDiv);
}

export const createSecondDiv = () => {
    const secondDiv = document.createElement("div");
    secondDiv.classList.add("pizza-description")

    const descriptionDivs = createSecondDivElements(pizzaObject);
    secondDiv.appendChild(descriptionDivs)
    
    createSecondDivElements(pizzaObject)

    // rootDiv.appendChild(secondDiv)
}





function main () {
    fetchPizzaObject().then(() => {
        // console.log(pizzaObject.ingredients)

        createFirstDiv();
        createSecondDiv();
    });
    fetchallergensObject().then(() => {
            // console.log(allergensObject)
    })
}

window.addEventListener("load", main);
