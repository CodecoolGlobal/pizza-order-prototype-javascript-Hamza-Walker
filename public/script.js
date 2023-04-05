import { createFirstDivElements , createSecondDivElements, advertisementDiv } from "./helpScript.js";
import { fetchPizzaObject, fetchallergensObject } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");
export const secondDiv = document.createElement("div");

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
    

    // const secondDiv = document.createElement("div");
    secondDiv.classList.add("pizza-description")
    // secondDiv.textContent = "put the pizza description and advertisment script on me"
    
    console.log(secondDiv)

    const descriptionDivs = createSecondDivElements(pizzaData);
    const advertisementDivs = advertisementDiv(pizzaData)

    secondDiv.appendChild(descriptionDivs)
    secondDiv.appendChild(advertisementDivs)


    // createSecondDivElements(pizzaData)
    rootDiv.appendChild(secondDiv)
}




async function main () {
    const data = await fetchPizzaObject()
    // console.log(data)
    createFirstDiv(data);
    createSecondDiv(data);
    fetchallergensObject().then(() => {
    })
}

window.addEventListener("load", main);
