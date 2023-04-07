import { createFirstDivElements,createSecondDivElements,createAllergensFilter,orders,createCheckoutDivs } from "./helpScript.js";
import { fetchJsonObjects } from "./fetchJson.js";
export const rootDiv = document.getElementById("root");
export const menueDiv = document.createElement("div");
export const mainDescriptionDiv = document.createElement("div");
export const mainFilterDiv = document.createElement("div");




const createMenueDiv = ({ pizzaData, allergensData}) => {
    
    menueDiv.classList.add("pizza-menu")
    const pizzaDivs = createFirstDivElements(pizzaData , allergensData);
    pizzaDivs.forEach(pizzaDiv => {
        menueDiv.appendChild(pizzaDiv);
    });
    
    rootDiv.appendChild(menueDiv);
}
const createDescriptionDiv = ({ pizzaData }) => {
    
    mainDescriptionDiv.classList.add("second-container")    
    const descriptionDivs = createSecondDivElements(pizzaData);
    mainDescriptionDiv.appendChild(descriptionDivs)

    rootDiv.appendChild(mainDescriptionDiv)
}
const createCheckOutDiv = ({pizzaData, allergensData}) => {

   
    createAllergensFilter(pizzaData,allergensData)

    rootDiv.appendChild(mainFilterDiv)
    createCheckoutDivs(orders)

}


async function main () {
   
    const data = await fetchJsonObjects()

    createMenueDiv(data);
    createDescriptionDiv(data);
    createCheckOutDiv (data);
}



window.addEventListener("load", main);
