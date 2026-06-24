export function validarNome(nome) {
  return nome.trim().length >= 3;
}

export function validarEmail(email) {
  return email.includes("@") && email.includes(".");
}

export function limparCampos(...campos) {
  campos.forEach((campo) => {
    campo.value = "";
  });
}

export function exibirMensagem(elemento, texto, tipo = "sucesso") {
  elemento.textContent = texto;
  elemento.className = tipo;

  setTimeout(() => {
    elemento.textContent = "";
    elemento.className = "";
  }, 3000);
}

export function calcularTotalClientes(clientes) {
  return clientes.reduce((total) => total + 1, 0);
}

export function formatarCliente(cliente) {
  return {
    id: cliente._id,
    nome: cliente.nome.toUpperCase(),
    email: cliente.email.toLowerCase()
  };
}

export function buscarClientePorEmail(clientes, email) {
  return clientes.find((cliente) => cliente.email === email);
}