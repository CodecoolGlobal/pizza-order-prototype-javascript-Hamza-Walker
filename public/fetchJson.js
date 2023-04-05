export let allergensObject;

export async function fetchPizzaObject() {
    try {
        const fetchRequests = [fetch('/api/pizza'),fetch('/api/allergens')]
        const [pizzaResponse, allergensResponse] = await Promise.all(fetchRequests);
        const pizzaData = await pizzaResponse.json();
        const allergensData = await allergensResponse.json()
        
        console.log(pizzaData, allergensData)

    

        return {pizzaData, allergensData}

        // pizzaObject = data;
        } 
        catch (error) {
            console.error(error);
            return [];
        }
}
export async function fetchallergensObject() {
    try {
        const response = await fetch('/api/allergens');
        const data = await response.json();
        allergensObject = data;
    } catch (error) {
        console.error(error);
        return [];
    }
}