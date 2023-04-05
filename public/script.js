import { createFirstDivElements , createSecondDivElements, advertisementDiv,createAllergensFilter } from "./helpScript.js";
import { fetchPizzaObject, fetchallergensObject } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");
export const secondDiv = document.createElement("div");
export const thirdDiv = document.createElement("div");

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
    
    secondDiv.classList.add("second-container")    

    const descriptionDivs = createSecondDivElements(pizzaData);
    const advertisementDivs = advertisementDiv(pizzaData)

    secondDiv.appendChild(descriptionDivs)
    secondDiv.appendChild(advertisementDivs)

    rootDiv.appendChild(secondDiv)
}
export const createthirdDiv = ({pizzaData,allergensData}) => {
    createAllergensFilter(pizzaData,allergensData)
    rootDiv.appendChild(thirdDiv)

}



async function main () {
    const data = await fetchPizzaObject()
    createFirstDiv(data);
    createSecondDiv(data);
    createthirdDiv (data);
}

window.addEventListener("load", main);
