async function duvidaStart() {
    let areaPergunta = document.querySelector('#areaPergunta')
    areaPergunta.classList.remove('d-none')
}

async function fecharPergunta() {
    let areaPergunta = document.querySelector('#areaPergunta')
    areaPergunta.classList.add('d-none')
}

async function enviarPergunta() {
    const duvidasEndpoint = '/postDuvida'
    const URLcompleta = `${protocolo}${baseURL}${duvidasEndpoint}`
    let duvidaBox = document.querySelector('#duvidaBox')
    let detalhesBox = document.querySelector('#detalhesBox')
    let duvida = duvidaBox.value
    let detalhes = detalhesBox.value
    let user = localStorage.getItem('login')
    try {
        if (duvida) {
            duvidaBox.value = ''
            detalhesBox.value = ''
            await axios.post(
                URLcompleta,
                { tituloDuvida: duvida, conteudoDuvida: detalhes, user: user }
            )
            fecharPergunta()
        }
    }
    catch (e) {
        console.log(e)
    }
}