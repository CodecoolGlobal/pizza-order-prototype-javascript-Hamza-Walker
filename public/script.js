import { createFirstDivElements , createSecondDivElements, advertisementDiv } from "./helpScript.js";
import { fetchPizzaObject, fetchallergensObject } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");

const createFirstDiv = ({ pizzaData }) => {
    const firstDiv = document.createElement("div");
    firstDiv.classList.add("pizza-menu")
    // firstDiv.textContent = "put the pizza menu on me"

    const pizzaDivs = createFirstDivElements(pizzaData);
    pizzaDivs.forEach(pizzaDiv => {
        firstDiv.appendChild(pizzaDiv);
    });
    
    rootDiv.appendChild(firstDiv);
}

export const createSecondDiv = ({ pizzaData }) => {
    const secondDiv = document.createElement("div");
    secondDiv.classList.add("pizza-description")

    const descriptionDivs = createSecondDivElements(pizzaData);
    secondDiv.appendChild(descriptionDivs)
    
    createSecondDivElements(pizzaData)
    advertisementDiv()
    // rootDiv.appendChild(secondDiv)
}





async function main () {
    const data = await fetchPizzaObject()
    console.log(data)
    createFirstDiv(data);
    createSecondDiv(data);
    fetchallergensObject().then(() => {
    })
}

window.addEventListener("load", main);
