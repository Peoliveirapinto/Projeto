const protocolo = 'http://'
const baseURL = 'localhost:3000'

function listarDuvidas(duvidas){
    let tabela = document.querySelector('.duvidas')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    corpoTabela.innerHTML = ""
    for (let duvida of duvidas) {
        let linha = corpoTabela.insertRow(0)
        let celulaDuvida = linha.insertCell(0)
        
    }
}

async function duvidaStart() {
    let areaPergunta = document.querySelector('#areaPergunta')
    areaPergunta.classList.remove('d-none')
}

async function fecharPergunta() {
    let areaPergunta = document.querySelector('#areaPergunta')
    areaPergunta.classList.add('d-none')
}

async function enviarPergunta() {
    const duvidasEndpoint = '/duvidas'
    const URLcompleta = `${protocolo}${baseURL}${duvidasEndpoint}`
    let duvidaBox = document.querySelector('#duvidaBox')
    let detalhesBox = document.querySelector('#detalhesBox')
    let duvida = duvidaBox.value
    let detalhes = detalhesBox.value
    if (duvida){
        duvidaBox.value = ''
        detalhesBox.value =''
        //const duvidas =(await axios.post(URLcompleta, { duvida, detalhes})).data
        //listarDuvidas(duvidas)
        fecharPergunta()
    }
}