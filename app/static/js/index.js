// manipulando elementos
const limpa_conteudo_elemento = (id_elemento) => {
    id_elemento = document.getElementById(id_elemento)
    while(id_elemento.firstChild) id_elemento.removeChild(id_elemento.firstChild)
}


const create_grid = (dados) => {
    limpa_conteudo_elemento("listagem-lancamentos")
    document.getElementById("div-tabela").classList.remove("hidden")
    
    for ( pessoa of dados ){
        create_row(pessoa)
    }
}

const create_row = (pessoa) => {
    const listagem = document.getElementById("listagem-lancamentos")
    let tr = document.createElement("tr")
    tr.setAttribute("id", `pessoa_${pessoa.id_pessoa}`)

    let td_nome = document.createElement("td")
    td_nome.setAttribute("id", `pessoa_nome_${pessoa.id_pessoa}`)

    let array_nome = pessoa.nome.split(" ")
    td_nome.innerText = array_nome[0]

    let td_admissao = document.createElement("td")
    td_admissao.setAttribute("id", `pessoa_dt_admissao_${pessoa.id_pessoa}`)
    td_admissao.innerText =  formata_data( pessoa.data_admissao)

    let td_editar = document.createElement("td")
    td_editar.innerHTML = `<button class="btn btn-warning text-white"  onclick='edit(${pessoa.id_pessoa})'> Editar </button>`

    let td_excluir = document.createElement("td")
    td_excluir.innerHTML = `<button class="btn btn-danger text-white" onclick='remove(${pessoa.id_pessoa})'> Excluir </button>`

    tr.appendChild(td_nome)
    tr.appendChild(td_admissao)
    tr.appendChild(td_editar)
    tr.appendChild(td_excluir)
    
    listagem.appendChild(tr)
    
}

const remove_row = (pk) => {
    document.getElementById(`pessoa_${pk}`).remove()
}

const set_data = ( data ) => {

    document.getElementById("txt-nome").value = data.nome
    document.getElementById("txt-cpf").value = data.cpf
    document.getElementById("txt-rg").value = data.rg
    document.getElementById("txt-funcao").value = data.funcao
    document.getElementById("dt-data-admissao").value = data.data_admissao
    document.getElementById("dt-data-nascimento").value = data.data_nascimento
}

const limpar = () => {
    document.getElementById("form-cadastro").reset()
    document.getElementById("pessoa_id").value = ""
}

const set_border = (elemento) => {
    elemento.classList.add("border-danger", "remove_azul")
    setTimeout( () => {
        elemento.classList.remove("border-danger", "remove_azul")
    }, 3000)
}

const set_text = (dados, pk) => {
    const array_nome = dados["nome"].split(" ")
    const nome = array_nome[0]
    document.getElementById(`pessoa_nome_${pk}`).innerText = nome
    document.getElementById(`pessoa_dt_admissao_${pk}`).innerText = formata_data( dados["data_admissao"] )
}

//requests
function request (url, settings) {
    url = new URL(url)
    return fetch(url, settings)
}


const get_all_pessoa = async () => {
    
    const location = `${window.location.protocol}${window.location.host}`
    const url = `${location}/pessoas/`
    
    const settings = {
        "method": "GET",
    }
    alerta_carregando()
    const response_code = {
        200: success,
        404: not_found,
        422: error_parameters,
        500: error_internal,
        424: error_function_dependency
    }
    swal.close()
    try {
        const response = await request(url, settings)
        const dados = await response.json()
        
        if(dados.length == 0){
            get_swal_alert(["Atenção !", "Nenhum registro encontrado.", "info"])
            return
        }
        response_code[response.status](dados, create_grid)
    } catch (e){
        console.log(e)
        swal.close()
        get_swal_alert(["Erro !", "Ocorreu um erro inesperado.", "error"])
    }
}

const remove = async (pk) => {
    
    const location = `${window.location.protocol}${window.location.host}`
    const url = `${location}/pessoas/${pk}/`
    
    const settings = {
        "method": "DELETE",
    }
    alerta_carregando()
    const response_code = {
        200: success,
        404: not_found,
        422: error_parameters,
        500: error_internal,
        424: error_function_dependency
    }
    swal.close()
    try {
        const response = await request(url, settings)
        const dados = await response.json()
        
        response_code[response.status](pk, remove_row)
    } catch (e){
        console.log(e)
        swal.close()
        get_swal_alert(["Erro !", "Ocorreu um erro inesperado.", "error"])
    }
}


const edit = async (pk) => {
    // onclick='remove(${pessoa.id_pessoa})'
    const location = `${window.location.protocol}${window.location.host}`
    const url = `${location}/pessoas/${pk}/`
    
    const settings = {
        "method": "GET",
    }
    alerta_carregando()
    const response_code = {
        200: success,
        404: not_found,
        422: error_parameters,
        500: error_internal,
        424: error_function_dependency
    }
    swal.close()
    try {
        const response = await request(url, settings)
        const dados = await response.json()
        response_code[response.status](dados, set_data)
        document.getElementById("pessoa_id").value = pk
    } catch (e){
        console.log(e)
        swal.close()
        get_swal_alert(["Erro !", "Ocorreu um erro inesperado.", "error"])
    }
}

const cadastrar = async () => {

    const validator =  validation()
    const form_valid =  verify_fields_form()


    if( validator.pk  != "" || form_valid == false  ){
        swal.close()
        get_swal_alert(["Atenção !", "Revise o formulário.", "warning"])
        return
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(validator.data);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    const location = `${window.location.protocol}${window.location.host}`
    const url = `${location}/pessoas/`

    alerta_carregando()
    const response_code = {
        200: success,
        404: not_found,
        422: error_parameters,
        500: error_internal,
        424: error_function_dependency
    }

    try {
        swal.close()
        const response = await request(url, requestOptions)
        const dados = await response.json()
        document.getElementById("pessoa_id").value = dados["id_pessoa"]
        response_code[response.status](dados, create_row)
    } catch (e){
        console.log(e)
        swal.close()
        get_swal_alert(["Erro !", "Ocorreu um erro inesperado.", "error"])
    }
}


const atualizar = async () => {

    const validator = validation()
  
    
    if( validator.pk == "" || verify_fields_form() == false ){
        swal.close()
        console.log("nao passou")
        get_swal_alert(["Atenção !", "Revise o formulário.", "warning"])
        return
    }


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify(validator.data);

    var requestOptions = {
        method: 'PATCH', 
        headers: myHeaders,
        body: raw,
        redirect: 'follow' 
    };

    const location = `${window.location.protocol}${window.location.host}`
    const url = `${location}/pessoas/${validator.pk}/`

    alerta_carregando()
    const response_code = {
        200: success,
        404: not_found,
        422: error_parameters,
        500: error_internal,
        424: error_function_dependency
    }
    swal.close()
    try {
        const response = await request(url, requestOptions)
        const dados = await response.json()
        
        if(dados.length == 0){
            get_swal_alert(["Atenção !", "Nenhum registro encontrado.", "info"])
            return
        }
        document.getElementById("pessoa_id").value = validator.pk
        set_text( dados, validator.pk )
        response_code[response.status](dados, set_data)
    } catch (e){
        console.log(e)
        swal.close()
        get_swal_alert(["Erro !", "Ocorreu um erro inesperado.", "error"])
    }

}

//alerts
const get_swal_alert = ([title, text, icon] = par) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
    })
}


const alerta_processando = () => {
    Swal.fire({
        title: 'Processando!',
        icon : "info",
        html: 'extraindo informações..',
            didOpen: () => {
                swal.showLoading()
            }
   })
}


function alerta_carregando(){

    Swal.fire({
        title: 'Carregando!',
        icon : "info",
        html: 'Buscando informações solicitadas..',
            didOpen: () => {
                swal.showLoading()
            }
   })

}


const success = (dados, metodo) => {
    metodo(dados)
}

const not_found = () => {
    get_swal_alert(["Atenção !", "Nada Encontrado.", "warning"])
}

const error_parameters = () => {
    get_swal_alert(["Atenção !", "Parâmetros passados de forma incorreta.", "info"])
}

const error_internal = () => {
    get_swal_alert(["Erro !", "Ocorreu um erro interno no servidor.", "error"])
}

const error_function_dependency = () => {
    get_swal_alert(["Erro !", "O Processamento não foi realizado, pois uma função interna falhou.", "error"])
}

//validation 

const verify_fields_form = () => {
    let valid = true
    const form = document.getElementById('form-cadastro').querySelectorAll("input")
    for ( input of form ){
        if(input.value == "" && input.id != "pessoa_id"){
            set_border(input)
            valid = false
        }
    }

    return valid
}

const validation =  () => {
    const form = document.getElementById('form-cadastro')
    let data = new FormData(form);
    const pk = document.getElementById("pessoa_id").value
    data = Object.fromEntries(data.entries());
    
    return { data, pk}
}

const formata_data = (data) => {
    data = new Date(data);
    return data.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
}


const get_cookie = (cname) => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


//ações iniciais
const acoes_iniciais = () => {
    document.getElementById("btn-visualizar").addEventListener("click", get_all_pessoa)
    document.getElementById("btn-cadastrar").addEventListener("click", cadastrar)
    document.getElementById("btn-atualizar").addEventListener("click", atualizar)
    document.getElementById("btn-limpar").addEventListener("click", limpar)
    get_all_pessoa()
}

window.addEventListener("load", acoes_iniciais)
