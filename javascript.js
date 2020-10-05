
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados () {
        for (let i in this) {
            if (this[i]===null || this[i]=="" || this[i]===undefined) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }
    getProximoId () {
        let proximoId = localStorage.getItem("id")
        return parseInt(proximoId) + 1
    }
    gravar(despesa_json) {
        let id = this.getProximoId()
        despesa_json = JSON.stringify(despesa_json)
        localStorage.setItem(id, despesa_json)
        localStorage.setItem("id", id)
        console.log(localStorage.getItem(id))
    }
    recuperarRegistros () {
        let id = localStorage.getItem("id")

        for (let i = 1; i<=id ; i++)
        {
            let despesa = localStorage.getItem(i)
            despesa = JSON.parse(despesa)
            if (despesa===null) {
                continue
            }
            let criando_tr = document.createElement("tr")
            let criando_td_data = document.createElement("td")
            let criando_td_tipo = document.createElement("td")
            let criando_td_descricao = document.createElement("td")
            let criando_td_valor = document.createElement("td")
            criando_td_data.innerHTML = despesa["ano"]
            criando_td_tipo.innerHTML = despesa["tipo"]
            criando_td_descricao.innerHTML = despesa["descricao"]
            criando_td_valor.innerHTML = despesa["valor"]
            criando_tr.appendChild(criando_td_data)
            criando_tr.appendChild(criando_td_tipo)
            criando_tr.appendChild(criando_td_descricao)
            criando_tr.appendChild(criando_td_valor)
            document.getElementById("tabela").appendChild(criando_tr)

        }
    }
}


let bd = new Bd()

function cadastrandoUsuario () {
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)


    if (despesa.validarDados()==true) {
        bd.gravar(despesa)
        document.getElementById("dia").value = ""
        document.getElementById("descricao").value = ""
        document.getElementById("valor").value = ""
        alert("Dados Inseridos com sucesso!")
    } else {
        alert("Dados inválidos tente novamente")
    }

}

function consultando_dados() {
    bd.recuperarRegistros()
}






