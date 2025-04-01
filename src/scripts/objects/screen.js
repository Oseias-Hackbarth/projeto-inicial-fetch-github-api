const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                            <img src="${user.avatarUrl}" alt="foto do perfil do usuário" />
                            <div class="data">
                              <h1> ${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                              <p> ${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                              <p class="followers">${user.followers} 👥followers ◾ ${user.following} following</p>
                            </div>
                                       </div>`;

        let repositoriesItens = "";

        user.repositories.forEach(repo => repositoriesItens +=  `<li>
            <a href="${repo.html_url}" target="_blank"><span class="repo-name">${repo.name}</span><br>
            <ul class="repo-info">
            <li>⭐${repo.stargazers_count}</li> 
            <li>🍴${repo.forks_count}</li>  
            <li>👀${repo.watchers_count}</li>  
            <li>📝${repo.language ?? 'N/A'}</li>
            </ul>
            </a> </li> `)
        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                           </div>`;
        }
        else {
            this.userProfile.innerHTML += `<p> Não possui repositórios 😢</p>`
        }

        let eventsItens = "";
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                const commitMessage = event.payload.commits?.length > 0 ? event.payload.commits[0].message : "Sem mensagem de commit";
                eventsItens += `<li><span class="event-name">${event.repo.name}</span> ◾ ${commitMessage}</li>`;
            } else if (event.type === "CreateEvent") {
                eventsItens += `<li>Sem mensagem de commit</li>`;
            }
        });

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Últimos Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                           </div>`;
        } else {
            this.userProfile.innerHTML += `<p>Não possui eventos recentes 😢</p>`;
        }

    },


    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen };