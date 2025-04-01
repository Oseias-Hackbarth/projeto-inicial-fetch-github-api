import { getUser } from "./services/user.js";
import { getrepositories } from "./services/repositories.js";
import { user } from "./objects/user.js";
import { screen } from "./objects/screen.js";
import { getEvents } from "./services/events.js";
//


document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if (validateEmpytInput(userName))  return
    getUserData(userName);
});

document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value
    const key = e.wich || e.keyCode
    const isEnterKeyPressed = key === 13
    if (isEnterKeyPressed) {
        if (validateEmpytInput(userName))  return
        getUserData(userName);
    }
})

function validateEmpytInput(userName) {
    if (userName.length === 0) {
        alert('Preencha o campo com o nome do usuário do GitHub')
        return true
    }
}

async function getUserData(userName) {
    const response = await getUser(userName);
    if (response.message === "Not Found") {
        screen.renderNotFound();
        return
    }
    const repositoriesResponse = await getrepositories(userName);
    const eventsResponse = await getEvents(userName);

    user.setinfo(response);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);
    screen.renderUser(user);
} 



