const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123mudar",
  database: "agenda-petshop",
});

module.exports = connection;

/**
 * Responsabilidade:
 * connection = criar conexão com o banco de dados MySQL
 */
