let filmes = []

const filme = []

let favoritos = []

let ultimoId

function geradorDeId() {
    let valor = parseInt((Math.random() * 100000) + 1)

    return valor === ultimoId ? geradorDeId() : valor
}

function cadastrarFilme(event) {
    event.preventDefault()
    const imagemURL = document.querySelector('#capa_filme_id')
    const inputTitulo = document.querySelector('#titulo_id')
    const inputAutor = document.querySelector('#autor_id')
    const anoLancamento = document.querySelector('#ano_lancamento_id')
    const generoFilme = document.querySelector('#genero_filme_id')
    const duracaoFilme = document.querySelector('#duracao_filme_id')
    const sinopse = document.querySelector('#sinopse_id')
    

    filme.push(
            geradorDeId(),
            imagemURL.value, 
            inputTitulo.value, 
            inputAutor.value,
            anoLancamento.value,
            generoFilme.value,
            duracaoFilme.value,
            sinopse.value
        )

    filmes.push(filme)

    localStorage.setItem('filmes', JSON.stringify(filmes))
    location.reload()
}


function controlarPopup(event) {
    const cadastrarButton = document.querySelector('section button')
    const divPopup = document.querySelector('.cadastrar-filmes')

     if (event.target == divPopup) {
        divPopup.classList.add('ocultar')
     }

     if (event.target == cadastrarButton) {
        divPopup.classList.remove('ocultar')
     }

}

const filmesLocalStorage = localStorage.getItem('filmes')

if (filmesLocalStorage) {
    filmes = JSON.parse(filmesLocalStorage)
}

const sectionFilmes = document.querySelector('.filmes')
const sectionFavoritos = document.querySelector('.favoritos')
const h4Favoritos = document.querySelector('.favoritos h4')

filmes.forEach((filme, index) => {
    sectionFilmes.innerHTML += `
    <div class="card-filme ${index}" draggable="true" ondragstart="arrastarFilme(event)" ondragend="dragEnd(event)" dropeffect="move" onclick="contrarPopupConteudoFilme(event, ${index})">
        <div class="filme">
            <div>
                <image src="${filme[1]}" alt="capa do filme.jpg" class="capa" id="${index}"/>
            </div>
            <div class="descricao">
                <p>${filme[2]}</p>
                <p>Diretor: ${filme[3]}</p>
                <p>Ano de Lançamento: ${filme[4]}</p>
            </div>
        </div>
    </div>
    `
})

function arrastarFilme(event, index) {
    sectionFavoritos.style.display = "flex"
    sectionFavoritos.style.transform = "TranslateY(0%)"
    event.dataTransfer.setData("text/plain", index)
    console.log(event.target.id)
}

function dragEnd(event) {
    event.preventDefault()
    sectionFavoritos.style.transform = "TranslateY(120%)"
    sectionFavoritos.style.display = "none"
}

const cardFilme = document.querySelector('.card-filme')

function receberFavorito(event) {
    event.preventDefault()
    const idImage = parseInt(cardFilme.classList[1])
    if (favoritos.find(filmeFavorito => filmeFavorito[0] === filmes[Number(idImage)][0])) {
        return
    } else {
        favoritos.push(filmes[Number(idImage)])
        console.log(favoritos)
        localStorage.setItem('favoritos', JSON.stringify(favoritos))
        location.reload()
    }
}

const listaFavoritos = document.querySelector('.favoritos')

const localStorageFavoritos = localStorage.getItem('favoritos')

if (localStorageFavoritos) {
    favoritos = JSON.parse(localStorageFavoritos)
}

console.log(favoritos)

favoritos.forEach((filmeFavorito) => {
    listaFavoritos.innerHTML = `
        <div class="card-favorito">
            <div class="favorito">
                <div>
                    <img src="${filmeFavorito[1]}" alt="capa do filme.jpg" class="capa"/>
                </div>
                <div class="descricao">
                    <p>Título: ${filmeFavorito[2]}</p>
                </div>
            </div>
        </div>
    `
})

function contrarPopupConteudoFilme(event, index) {
    const wrapper = document.querySelector('.wrapper')
    if (event.target != wrapper) {
        wrapper.classList.remove('ocultar')
    }

    if (event.target == wrapper) {
        wrapper.classList.add('ocultar')
    }

    const capaFilmeDesc = document.querySelector('.titulo-image .image img')

    const filmeSelecionado = filmes[Number(index)]
    console.log(filmeSelecionado)
    capaFilmeDesc.setAttribute('src', filmeSelecionado[1])

    const tituloFilme = document.querySelector('.titulo')
    const sinopse = document.querySelector('.sinopse')
    const genero = document.querySelector('.genero')
    const diretor = document.querySelector('.diretor')
    const duracao = document.querySelector('.duracao')
    const anoLancamento = document.querySelector('.ano-lacamento')

    tituloFilme.textContent = filmeSelecionado[2]
    genero.textContent = filmeSelecionado[5]
    diretor.textContent = filmeSelecionado[3]
    duracao.textContent = filmeSelecionado[6] + " min"
    anoLancamento.textContent = filmeSelecionado[4]
    sinopse.textContent = filmeSelecionado[7]
}

function deletarFilme(event) {
    filmes.splice(parseInt(cardFilme.classList[1]), 1)
    localStorage.setItem('filmes', JSON.stringify(filmes))
    location.reload()
}