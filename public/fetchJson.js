export let allergensObject;

export async function fetchJsonObjects() {
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
