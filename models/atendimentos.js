const moment = require("moment");

const connection = require("../infra/connection");

class Atendimento {
  adicionarAtendimento(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD hh:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD hh:mm:ss"
    );

    // VALIDAÇÃO 1
    const dataEhValida = moment(data).isSameOrAfter(dataCriacao);

    // VALIDAÇÃO 2
    const clienteEhValido = atendimento.cliente.length >= 5;

    const validacoes = [
      {
        nome: "data",
        valido: dataEhValida,
        mensagem: "Data deve ser maior ou igual a data atual!",
      },
      {
        nome: "cliente",
        valido: clienteEhValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres!",
      },
    ];

    const erros = validacoes.filter((campo) => !campo.valido);
    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };
      const sql = "INSERT INTO Atendimentos SET ?";

      connection.query(sql, atendimentoDatado, (erro) => {
        if (erro) {
          res.status(400).json(erro);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  listarAtendimento(res) {
    const sql = "SELECT * FROM Atendimentos";
    connection.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscarId(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
    connection.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  alterarAtendimento(id, campoAtendimento, res) {
    if (campoAtendimento.data) {
      campoAtendimento.data = moment(
        campoAtendimento.data,
        "DD/MM/YYYY"
      ).format("YYYY-MM-DD hh:mm:ss");
    }
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";
    connection.query(sql, [campoAtendimento, id], (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({id, ...campoAtendimento});
      }
    });
  }

  deletarAtendimento(id, res) {
    const sql = `DELETE FROM Atendimentos WHERE id=?`;
    connection.query(sql, id, (erro) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();

/**
 * Responsabilidade de um model é criar as regras de negócio
 * "?" = significa que será pego as informações e adicionar na tabela
 */
