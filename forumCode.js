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
            mostrarDuvidas()
        }
    }
    catch (e) {
        console.log(e)
    }
}

async function mostrarDuvidas() {
    const duvidasEndpoint = '/getDuvidas'
    const URLcompleta = `${protocolo}${baseURL}${duvidasEndpoint}`

    try {
        const response = await axios.get(URLcompleta)
        const duvidas = response.data
        const duvidasContainer = document.querySelector('#duvidasContainer')
        duvidasContainer.innerHTML = ''
        duvidas.forEach(duvida => {
            const questionDiv = document.createElement('div')
            questionDiv.classList.add('question-container')
            questionDiv.innerHTML = `
                    <div class="question" style="margin-bottom: 10px; border-bottom: 1px solid #ccc; padding-bottom: 10px;">
                        <strong>${duvida.tituloDuvida} ${duvida.user} </strong>
                        <p>${duvida.conteudoDuvida}</p>

                    </div>
                    <div class="resolved" style="font-style: italic; color: ${duvida.resolvida ? 'green' : 'red'};">
                        ${duvida.resolvida ? 'Resolvido' : 'Não resolvido'}
                    </div>
                    
                `
            duvidasContainer.appendChild(questionDiv)
        })
    } catch (error) {
        console.error('Erro ao carregar as dúvidas:', error)
    }
}