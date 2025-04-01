 import { baseUrl, eventsQuantity } from '../variable.js'; 
 
async function getEvents(userName) {
    const response = await fetch(`${baseUrl}/${userName}/events?per_page=${eventsQuantity}`);
    const events = await response.json();
    return events.filter(event => event.type === "PushEvent" || event.type === "CreateEvent");
}

export { getEvents };