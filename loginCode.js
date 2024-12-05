const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function prepararPagina(){
    const token = localStorage.getItem("token")
    const loginLink = document.querySelector('#loginLink')
    if (token){
        loginLink.innerHTML = 'Logout'
    }
    else{
        loginLink.innerHTML = 'Login'
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#registerUsername')
    let senhaCadastroInput = document.querySelector('#registerPassword')
    let escolaridadeInput = document.querySelector('#educationLevel')
    let usuarioCadastro =usuarioCadastroInput.value
    let senhaCadastro = senhaCadastroInput.value
    let escolaridade = escolaridadeInput.value
    if (usuarioCadastro && senhaCadastro){
        try{
            const cadastroEndpoint ='/signup'
            const URLcompleta =`${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLcompleta,
                {login: usuarioCadastro, password: senhaCadastro, escolaridade: escolaridade}
            )
            usuarioCadastroInput.value =''
            senhaCadastroInput.value =''
        }
        catch(e){
            senhaCadastroInput.value =''
            escolaridadeInput.value =''
            console.log(e)
        }
    }
}

const loginUsuario = async () =>{
    let usuarioLoginInput = document.querySelector('#username')
    let senhaLoginInput = document.querySelector('#password')
    let usuarioLogin =usuarioLoginInput.value
    let senhaLogin =senhaLoginInput.value
    if (usuarioLogin && senhaLogin){
        try {
            const loginEndpoint = '/login'
            const URLcompleta  = `${protocolo}${baseURL}${loginEndpoint}`
            const response = await axios.post(
                URLcompleta,
                {
                    login: usuarioLogin,
                    password: senhaLogin
                }
            )
            localStorage.setItem("token",response.data)
            localStorage.setItem("login",usuarioLogin)
            usuarioLoginInput.value = ""
            senhaLoginInput.value=""
            const loginLink = document.querySelector('#loginLink')
            loginLink.innerHTML ='Logout'
        } 
        catch (e) {
            senhaLoginInput.value =''
        }
    }
}