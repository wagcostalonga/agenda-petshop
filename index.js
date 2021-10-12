const customExpress = require("./config/customExpress");
const connection = require("./infra/connection");

const Tables = require("./infra/tables");

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    const app = customExpress();
    Tables.init(connection);
    app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
    console.log("Conectado ao db com sucesso!");
  }
});

/**
 * Responsabilidade:
 * index.js = subir o servidor no ar
 */
