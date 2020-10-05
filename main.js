document.getElementById("btn").addEventListener('click', function () {
    requisicao()
})

function renderInfos(data) {
    for (let i in data) {
        const repos = document.querySelector('.repos')
        const nameRepo = data[i].name
        const imgUrl = data[i].language
        const linkRepo = data[i].html_url

        const repo = `
        <div class="repo">
            <div>
                <h3 class="title-repo">${nameRepo}</h3>
                <a class="link-repo" target="_blank" href="${linkRepo}">ir para o repositório</a>
            </div>
            <img src="images/${imgUrl}.png" class="lang" width="50">
        </div>
        `
        repos.innerHTML += repo
    }
}


function limpaTela() {
    const repos = document.querySelector('.repos')
    repos.innerHTML = ""
}

function requisicao() {
    const user = document.getElementById("busca").value
    fetch(`https://api.github.com/users/${user}/repos`).then((response) => {
        if (response.status == 200) {
            return response.json()
        }
        throw new Error('Usuário não encontrado.')
    }).then(response => {
        limpaTela()
        renderInfos(response)

        const content = document.querySelector('.user')
        const avatarUrl = response[0].owner.avatar_url
        const nameUser = response[0].owner.login
        content.innerHTML = `<img src="${avatarUrl}"><h1>${nameUser}</h1>`

    })
}

