
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

    getProximoId() {
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

    recuperarRegistros() {
        let id = localStorage.getItem("id")
        let array_despesas = []

        for (let i = 1; i <= id; i++) {
            let despesa = localStorage.getItem(i)
            despesa = JSON.parse(despesa)
            if (despesa === null) {
                continue
            }
            array_despesas.push(despesa)

        }
        return array_despesas
    }

    adicionandoRegistros(array_despesas) {
        let id = 0
        let somando_despesas = 0
        while (id < array_despesas.length) {
            let criando_tr = document.createElement("tr")
            let criando_td_data = document.createElement("td")
            let criando_td_tipo = document.createElement("td")
            let criando_td_descricao = document.createElement("td")
            let criando_td_valor = document.createElement("td")

            switch (parseInt(array_despesas[id]["tipo"])) {
                case 1:
                    array_despesas[id]["tipo"] = "Alimentação"
                    break
                case 2:
                    array_despesas[id]["tipo"] = "Educação"
                    break
                case 3:
                    array_despesas[id]["tipo"] = "Lazer"
                    break
                case 4:
                    array_despesas[id]["tipo"] = "Saúde"
                    break
                case 5:
                    array_despesas[id]["tipo"] = "Transporte"
                    break
            }

            criando_td_data.innerHTML =
                array_despesas[id]["dia"]+"/"+array_despesas[id]["mes"]+"/"+
                array_despesas[id]["ano"]
            criando_td_tipo.innerHTML = array_despesas[id]["tipo"]
            criando_td_descricao.innerHTML = array_despesas[id]["descricao"]
            criando_td_valor.innerHTML = "R$ " + array_despesas[id]["valor"]
            criando_tr.appendChild(criando_td_data)
            criando_tr.appendChild(criando_td_tipo)
            criando_tr.appendChild(criando_td_descricao)
            criando_tr.appendChild(criando_td_valor)
            if (id%2==0) {
                criando_tr.className = "tr_par"
            }
            else {
                criando_tr.className = "tr_inpar"
            }
            document.getElementById("tabela").appendChild(criando_tr)
            somando_despesas += parseFloat(array_despesas[id]["valor"])
            id += 1
        }
        let total = document.createElement("th")
        total.colSpan = "4"
        total.innerHTML = "Total de despesas: R$ "+ somando_despesas
        document.getElementById("tabela").appendChild(total)
    }
    filtro(array_despesas) {
        let tipo = document.getElementById("tipo_consulta").value
        let filtro = array_despesas.filter(
            (f)=>f.tipo==tipo
        )
        console.log(filtro)
    }
    mensagem(mensagem, cor, id) {
        let criando_h1 = document.createElement("h3")
        criando_h1.innerHTML = mensagem
        criando_h1.style.background = cor
        criando_h1.id = id
        document.getElementById("mensagem").appendChild(criando_h1)
        setTimeout(function () {
            criando_h1.remove()
            }, 3000
        )

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
        bd.mensagem("Dados Inseridos com sucesso!", "green", "sucesso")
    } else {
        bd.mensagem("Dados inválidos tente novamente", "red", "erro")
    }
}


function consultando_dados() {
    let array_despesas = bd.recuperarRegistros()
    bd.adicionandoRegistros(array_despesas)
}

function filtrando_dados() {
    let array_despesas = bd.recuperarRegistros()
    bd.filtro(array_despesas)
}





