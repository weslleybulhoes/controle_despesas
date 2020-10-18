
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
            despesa.id = i
            array_despesas.push(despesa)
        }
        return array_despesas
    }

    adicionandoRegistros(array_despesas) {
        var id = 0
        let somando_despesas = 0
        while (id < array_despesas.length) {
            var criando_tr = document.createElement("tr")
            let criando_td_data = document.createElement("td")
            let criando_td_tipo = document.createElement("td")
            let criando_td_descricao = document.createElement("td")
            let criando_td_valor = document.createElement("td")
            let btn = document.createElement("button")

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
            btn.className = 'btn btn-danger'
            btn.innerHTML = '<i class="fas fa-times"></i>'
            btn.style.margin = "8"
            btn.style.marginLeft = "40%"
            criando_tr.appendChild(btn)
            document.getElementById("tabela").appendChild(criando_tr)
            somando_despesas += parseFloat(array_despesas[id]["valor"])
            btn.id = "ident"+array_despesas[id].id
            btn.onclick = function () {
                let id = this.id.replace('ident','')
                localStorage.removeItem(id)
                window.location.reload()
            }
            id += 1
        }
        let total = document.createElement("th")
        total.colSpan = "5"
        total.innerHTML = "Total de despesas: R$ "+ somando_despesas

        document.getElementById("tabela").appendChild(total)
    }
    filtro(despesa_filtrada, despesa_todas) {

        var filtrando_array = Array()

        for (var invalido in despesa_filtrada) {
            if (despesa_filtrada[invalido] =='') {
                delete despesa_filtrada[invalido]
            }
        }

        var contador = 1
        for (var filtro in despesa_filtrada) {
            if (contador==1) {
                filtrando_array[contador] = despesa_todas.filter(
                    (f) => f[filtro] == despesa_filtrada[filtro])
            }
            contador++
            filtrando_array[contador] = filtrando_array[contador-1].filter(
                (f) => f[filtro] == despesa_filtrada[filtro]
            )
        }
        bd.sairdofiltro()
        document.getElementById("tabela").innerHTML = ""
        if (filtrando_array[contador]===undefined || filtrando_array[contador].length==0) {
            let erro = document.createElement("th")
            erro.colSpan = "5"
            erro.innerHTML = "Não existem dados para o filtro informado."
            erro.style.background = "#ff4040"
            document.getElementById("tabela").appendChild(erro)
            return
        }

        bd.adicionandoRegistros(filtrando_array[contador])

    }

    sairdofiltro () {
        if (gambiarra===false) {
            document.getElementById("atualizar").remove()
        }
        let botao_sair = document.createElement("button")
        botao_sair.innerHTML = "Sair do Filtro"
        botao_sair.id = "atualizar"
        botao_sair.className = "download"
        gambiarra = false
        document.getElementById("add_filtro").appendChild(botao_sair)
        botao_sair.onclick = function () {
            window.location.reload()
        }
    }

    mensagem(mensagem) {
        alert(mensagem)
    }
}

let bd = new Bd()
var gambiarra = true

function cadastrandoUsuario () {
    let data = document.getElementById("data").value
    let ano = data.slice(0,4)
    let mes = data.slice(5,7)
    let dia = data.slice(8)
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    if (despesa.validarDados()) {
        bd.gravar(despesa)
        bd.mensagem("Dados Inseridos com sucesso!")
    } else {
        bd.mensagem("Dados inválidos tente novamente")
    }
}


function consultando_dados() {
    let array_despesas = bd.recuperarRegistros()
    bd.adicionandoRegistros(array_despesas)
}

function filtrando_dados() {
    let ano = document.getElementById("ano").value
    let dia = document.getElementById("dia").value
    let mes = document.getElementById("mes").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    let tipo = document.getElementById("tipo_consulta").value
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)
    let despesa_todas = bd.recuperarRegistros()
    bd.filtro(despesa, despesa_todas)
}



function ExportToExcel() {
       var htmltable= document.getElementById('tabela1');
       var html = htmltable.outerHTML;
       window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}


