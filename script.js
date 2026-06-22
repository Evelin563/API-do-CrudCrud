const API_URL = "https://crudcrud.com/api/8e11a187917f44b3aece31f48bacea6a/clientes";

const formCliente = document.getElementById("formCliente");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const listaClientes = document.getElementById("listaClientes");

formCliente.addEventListener("submit", cadastrarCliente);

async function cadastrarCliente(event) {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();

  if (nome === "" || email === "") {
    alert("Preencha todos os campos.");
    return;
  }

  const cliente = {
    nome: nome,
    email: email
  };

  try {
    const resposta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar cliente.");
    }

    formCliente.reset();
    listarClientes();

  } catch (erro) {
    console.error("Erro ao cadastrar:", erro);
    alert("Erro ao cadastrar cliente. Verifique se a API do CrudCrud ainda está válida.");
  }
}

async function listarClientes() {
  listaClientes.innerHTML = "<p class='mensagem'>Carregando...</p>";

  try {
    const resposta = await fetch(API_URL);

    if (!resposta.ok) {
      throw new Error("Erro ao listar clientes.");
    }

    const clientes = await resposta.json();

    listaClientes.innerHTML = "";

    if (clientes.length === 0) {
      listaClientes.innerHTML = "<p class='mensagem'>Nenhum cliente cadastrado.</p>";
      return;
    }

    clientes.forEach(function(cliente) {
      const item = document.createElement("div");
      item.classList.add("cliente");

      item.innerHTML = `
        <div>
          <strong>${cliente.nome}</strong>
          <span>${cliente.email}</span>
        </div>

        <button class="btn-excluir" onclick="excluirCliente('${cliente._id}')">
          Excluir
        </button>
      `;

      listaClientes.appendChild(item);
    });

  } catch (erro) {
    console.error("Erro ao listar:", erro);
    listaClientes.innerHTML = "<p class='erro'>Erro ao carregar clientes. Gere uma nova API no CrudCrud.</p>";
  }
}

async function excluirCliente(id) {
  try {
    const resposta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error("Erro ao excluir cliente.");
    }

    listarClientes();

  } catch (erro) {
    console.error("Erro ao excluir:", erro);
    alert("Erro ao excluir cliente.");
  }
}

listarClientes();