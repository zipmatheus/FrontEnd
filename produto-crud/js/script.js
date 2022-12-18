var api = "http://54.204.228.157:8080/api/produto/";
var lista;

xhttp = new XMLHttpRequest();

function listar() {
    xhttp.open("GET", api);
    xhttp.send();
    xhttp.onload = function () {
        lista = this.responseText;
        lista = JSON.parse(lista);
        corpoTabela = "";
        for (i in lista) {
            produto = lista[i];
            corpoTabela += `
                    <tr onclick='editar(${i})'>
                    <td>${produto.nome}</td>
                    <td>${produto.descricao}</td>
                    <td>${produto.valor}</td>
                    </tr>`;
        }
        document.querySelector("#corpoTabela").innerHTML = corpoTabela;
    }
}

listar();

function editar(i) {
    produto = lista[i];
    document.querySelector("#nome").value = produto.nome;
    document.querySelector("#descricao").value = produto.descricao;
    document.querySelector("#valor").value = produto.valor;
    document.querySelector("#id").value = produto.id;
}

function gravar() {
    produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;

    produto.id = document.getElementById("id").value;

    acao = (produto.id > 0) ? "PUT" : "POST";

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () {
        // this.responseText;
        listar();
        limpar();
    }

}

function limpar() {
    document.querySelector("#nome").value = "";
    document.querySelector("#descricao").value = "";
    document.querySelector("#valor").value = "";
    document.querySelector("#id").value = "";
}

function apagar() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        msg = this.responseText;
        alert(msg);
        listar();
        limpar();
    }
}