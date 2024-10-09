const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/>
                <div class="data">
                    <h1>${user.name ?? 'Não possui nome cadastrado 😔'}</h1>
                    <p>${user.bio ?? 'Não possui bio cadastrada 😔'}</p>
                    <p>Login: ${user.userName}</p>
                    <p>👥 ${user.followers} seguidores</p>
                    <p>👥 ${user.following} seguindo</p>
                </div>
            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += 
            `<li>
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <div class="repo-infos">
                    <ul>
                        <li>🍴 ${repo.forks_count}</li>
                        <li>⭐ ${repo.stargazers_count}</li>
                        <li>👀 ${repo.watchers_count}</li>
                        <li>👩‍💻 ${repo.language ?? ""}</li>
                    </ul>
                </div>
            </li>`
        });

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML +=
                `<div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        let eventItems = ""
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventItems += `<p>${event.repo.name} <span>- ${event.payload.commits[0].message}</span></p>`
            } else if (event.type === "CreateEvent") {
                eventItems += `<p>${event.repo.name} <span>- Sem mensagem de commit.</span></p>`
            }
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML +=
                `<div class="events">
                <h2>Events:</h2>
                <ul>${eventItems}</ul>
             </div>`
        }

    },
    renderNotFound() {
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export { screen }