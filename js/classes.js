export class Cliente {
  constructor(nome, email) {
    this.nome = nome;
    this.email = email;
  }
}

export class ClienteAPI {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async cadastrar(cliente) {
    const resposta = await fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (!resposta.ok) {
      throw new Error("Erro ao cadastrar cliente.");
    }

    return resposta.json();
  }

  async listar() {
    const resposta = await fetch(this.apiUrl);

    if (!resposta.ok) {
      throw new Error("Erro ao listar clientes.");
    }

    return resposta.json();
  }

  async excluir(id) {
    const resposta = await fetch(`${this.apiUrl}/${id}`, {
      method: "DELETE"
    });

    if (!resposta.ok) {
      throw new Error("Erro ao excluir cliente.");
    }
  }
}