const Atendimento = require("../models/atendimentos");

module.exports = (app) => {
  app.get("/atendimentos", (req, res) => {
    Atendimento.listarAtendimento(res);
  });

  app.get("/atendimentos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    Atendimento.buscarId(id, res);
  });

  app.post("/atendimentos", (req, res) => {
    const atendimento = req.body;
    Atendimento.adicionarAtendimento(atendimento, res);
  });
};

/**
 * Responsabilidade:
 * atendimento.js = controlar as rotas
 * 
 * parseInt(req.params.id) = convertendo a string do ID em número 
 */
