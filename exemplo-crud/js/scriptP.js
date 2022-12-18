xhttp = new XMLHttpRequest();
var listaProduto;
var api = "http://54.204.228.157:8080/api/produto/";

function listarProduto(){
    xhttp.open("GET", api);

    xhttp.send();

    xhttp.onload = function () {
        listaProduto = this.responseText;
        listaProduto = JSON.parse(listaProduto);
        texto = "";

        i = 0;
        for(const p of listaProduto){
            texto += `<tr onclick='editarProduto(${i})'><td>${p.nome}</td><td>${p.descricao}</td><td>${p.valor}</td></tr>`;
            i++;
        }

        document.getElementById('listaProduto').innerHTML = texto;
    }
}

function editarProduto(i) {
    p = listaProduto[i];
    document.getElementById("nome").value = p.nome;
    document.getElementById("descricao").value = p.descricao;
    document.getElementById("valor").value = p.valor;
    document.getElementById("id").value = p.id;
}

function gravarProduto() {
    var produto = {};
    produto.nome = document.getElementById("nome").value;
    produto.descricao = document.getElementById("descricao").value;
    produto.valor = document.getElementById("valor").value;
    produto.id = document.getElementById("id").value;

    if (produto.id > 0) {
        acao = "PUT";
    } else {
        acao = "POST";
    }

    xhttp.open(acao, api);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify(produto));
    xhttp.onload = function () {
        // console.log(this.responseText);
        listarProduto();
        limparProduto();
    }
}

function limparProduto() {
    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("id").value = "";
}

function apagarProduto() {
    id = document.getElementById("id").value;
    xhttp.open("DELETE", api + id);
    xhttp.send();
    xhttp.onload = function () {
        alert(this.responseText);
        listarProduto();
        limparProduto();
    }
}
listarProduto();