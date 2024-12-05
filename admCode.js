const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function addAdmin(){
    let adminUsernameInput = document.querySelector('#adminUsername')
    let adminUsername = adminUsernameInput.value
        try{
            const adminEndpoint = '/addAdmin'
            const URLcompleta = `${protocolo}${baseURL}${adminEndpoint}`
            await axios.post(
                URLcompleta,
                {login: adminUsername}
            )
            adminUsernameInput.value = ''
        }
        catch(e){
            console.log(e)
        }
}

async function postExercicio(){
    let conteudoExercicioInput = document.querySelector('#conteudo')
    let respostaExercicioInput = document.querySelector('#resposta')
    let dataExercicioInput = document.querySelector('#data')
    let conteudoExercicio = conteudoExercicioInput.value
    let respostaExercicio = respostaExercicioInput.value
    let dataExercicio = dataExercicioInput.value
    if (conteudoExercicio && respostaExercicio && dataExercicio){
        try{
            const exercicioEndpoint = '/postExercicio'
            const URLcompleta = `${protocolo}${baseURL}${exercicioEndpoint}`
            await axios.post(
                URLcompleta,
                {conteudoExercicio: conteudoExercicio, respostaExercicio: respostaExercicio, dataExercicio: dataExercicio}
            )
            conteudoExercicioInput.value = ''
            respostaExercicioInput.value = ''
            dataExercicioInput.value = ''
        }
        catch(e){
            console.log(e)
        }
    }
}