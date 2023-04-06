import { createFirstDivElements,createSecondDivElements,createAllergensFilter,orders,createCheckoutDivs } from "./helpScript.js";
import { fetchJsonObjects } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");
export const firstDiv = document.createElement("div");
export const secondDiv = document.createElement("div");
export const thirdDiv = document.createElement("div");




const createFirstDiv = ({ pizzaData, allergensData}) => {
    
    firstDiv.classList.add("pizza-menu")
    const pizzaDivs = createFirstDivElements(pizzaData , allergensData);
    pizzaDivs.forEach(pizzaDiv => {
        firstDiv.appendChild(pizzaDiv);
    });
    
    rootDiv.appendChild(firstDiv);
}
const createSecondDiv = ({ pizzaData }) => {
    
    secondDiv.classList.add("second-container")    
    const descriptionDivs = createSecondDivElements(pizzaData);
    secondDiv.appendChild(descriptionDivs)

    rootDiv.appendChild(secondDiv)
}
const createThirdDiv = ({pizzaData, allergensData}) => {

   
    createAllergensFilter(pizzaData,allergensData)

    rootDiv.appendChild(thirdDiv)
    createCheckoutDivs(orders)

}


async function main () {
   
    const data = await fetchJsonObjects()

    createFirstDiv(data);
    createSecondDiv(data);
    createThirdDiv (data);
}



window.addEventListener("load", main);
