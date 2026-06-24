import { Cliente, ClienteAPI } from "./classes.js";

import {
  validarNome,
  validarEmail,
  limparCampos,
  exibirMensagem,
  calcularTotalClientes,
  formatarCliente,
  buscarClientePorEmail
} from "./utils.js";

const API_URL = "https://crudcrud.com/api/8e11a187917f44b3aece31f48bacea6a/clientes";

const clienteAPI = new ClienteAPI(API_URL);

const formCliente = document.getElementById("formCliente");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const listaClientes = document.getElementById("listaClientes");
const mensagem = document.getElementById("mensagem");
const totalClientes = document.getElementById("totalClientes");

formCliente.addEventListener("submit", cadastrarCliente);

async function cadastrarCliente(event) {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();

  if (!validarNome(nome)) {
    exibirMensagem(
      mensagem,
      "O nome deve possuir pelo menos 3 letras.",
      "erro"
    );
    return;
  }

  if (!validarEmail(email)) {
    exibirMensagem(
      mensagem,
      "Digite um e-mail válido.",
      "erro"
    );
    return;
  }

  try {
    const clientes = await clienteAPI.listar();

    const clienteExistente = buscarClientePorEmail(clientes, email);

    if (clienteExistente) {
      exibirMensagem(
        mensagem,
        "Este e-mail já está cadastrado.",
        "erro"
      );
      return;
    }

    const novoCliente = new Cliente(nome, email);

    await clienteAPI.cadastrar(novoCliente);

    limparCampos(nomeInput, emailInput);

    exibirMensagem(
      mensagem,
      "Cliente cadastrado com sucesso!",
      "sucesso"
    );

    carregarClientes();

  } catch (erro) {
    console.error(erro);

    exibirMensagem(
      mensagem,
      "Erro ao cadastrar cliente. Verifique a API.",
      "erro"
    );
  }
}

async function carregarClientes() {
  listaClientes.innerHTML = "<p class='carregando'>Carregando clientes...</p>";

  try {
    const clientes = await clienteAPI.listar();

    const clientesFormatados = clientes.map(formatarCliente);

    renderizarClientes(clientesFormatados);

    const total = calcularTotalClientes(clientesFormatados);

    totalClientes.textContent = `Total: ${total}`;

  } catch (erro) {
    console.error(erro);

    listaClientes.innerHTML =
      "<p class='erro'>Erro ao carregar clientes.</p>";
  }
}

function renderizarClientes(clientes) {
  listaClientes.innerHTML = "";

  if (clientes.length === 0) {
    listaClientes.innerHTML =
      "<p class='carregando'>Nenhum cliente cadastrado.</p>";
    return;
  }

  clientes.forEach((cliente) => {
    const item = document.createElement("div");
    item.classList.add("cliente");

    const dados = document.createElement("div");

    const nome = document.createElement("strong");
    nome.textContent = cliente.nome;

    const email = document.createElement("span");
    email.textContent = cliente.email;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", () => {
      excluirCliente(cliente.id);
    });

    dados.appendChild(nome);
    dados.appendChild(email);

    item.appendChild(dados);
    item.appendChild(botaoExcluir);

    listaClientes.appendChild(item);
  });
}

async function excluirCliente(id) {
  try {
    await clienteAPI.excluir(id);

    exibirMensagem(
      mensagem,
      "Cliente excluído com sucesso!",
      "sucesso"
    );

    carregarClientes();

  } catch (erro) {
    console.error(erro);

    exibirMensagem(
      mensagem,
      "Erro ao excluir cliente.",
      "erro"
    );
  }
}

carregarClientes();