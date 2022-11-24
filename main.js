const produto = document.querySelector('#produto')
const valor = document.querySelector('#valor')
const btnAddProduto = document.querySelector('#btnAddProduto')
const listaProduto = document.querySelector('#listaProduto')
const tudoPDF = document.querySelector('#lista')

let valorTotal = 0

btnAddProduto.addEventListener('click', e => {
  let total = 0
  let novoProduto = {
    nome: produto.value,
    preco: valor.value,
    id: gerarId()
  }

  adicionarProduto(novoProduto)
  somarValor(novoProduto)
})

function gerarId() {
  return Math.floor(Math.random() * 3000)
}

function adicionarProduto(novoProduto) {
  let li = criarTagLi(novoProduto)
  listaProduto.appendChild(li)
  produto.value = ''
  valor.value = ''
}

function criarTagLi(novoProduto) {
  let li = document.createElement('li')
  li.id = novoProduto.id

  let div = document.createElement('div')
  div.classList.add('produto-info')

  let pNome = document.createElement('p')
  pNome.classList.add('nome-produto')
  pNome.innerHTML = novoProduto.nome

  let pValor = document.createElement('p')
  pValor.classList.add('valor-produto')
  pValor.innerHTML = 'R$ ' + novoProduto.preco

  let button = document.createElement('button')
  button.classList.add('btn-empt')
  button.innerHTML = '<img src="./src/x.svg" alt="" />'
  button.setAttribute(
    'onclick',
    'excluir(' + novoProduto.id + ',' + novoProduto.preco + ')'
  )

  div.appendChild(pNome)
  div.appendChild(pValor)

  li.appendChild(div)
  li.appendChild(button)

  return li
}

function excluir(idProduto, precoProduto) {
  let confirmacao = window.confirm('Tem certeza que deseja excluir?')
  if (confirmacao) {
    let li = document.getElementById('' + idProduto + '')
    if (li) {
      listaProduto.removeChild(li)
    }
    let valorProduto = parseFloat(precoProduto)
    valorTotal -= valorProduto
    criarTotal(valorTotal)
  }
}

function somarValor(novoProduto) {
  let valorProduto = parseFloat(novoProduto.preco)
  if (valorProduto > 0) {
    valorTotal += valorProduto
  }
  criarTotal(valorTotal)
}

function criarTotal(valorProduto) {
  let h2 = document.querySelector('#total')
  h2.innerHTML = 'Total R$' + valorProduto
}

function deletarTudo() {
  let confirmacao = window.confirm('Tem certeza que deseja excluir tudo?')
  if (confirmacao) {
    listaProduto.innerHTML = ''
    criarTotal(0)
  }
}

function baixar() {
  var opt = {
    margin: 1,
    filename: 'lista.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  }
  html2pdf().set(opt).from(tudoPDF).save()
}
