export let pizzaObject;
export let allergensObject;

export async function fetchPizzaObject() {
    try {
        const response = await fetch('/api/pizza');
        const data = await response.json();
        pizzaObject = data;
    } catch (error) {
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