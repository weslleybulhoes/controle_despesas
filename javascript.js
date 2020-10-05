
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
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

    bd.gravar(despesa)
}






