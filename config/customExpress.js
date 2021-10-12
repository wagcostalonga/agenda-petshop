const express = require("express");
const consign = require("consign");

module.exports = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  consign().include("controllers").into(app);
  return app;
};

/**
 * Responsabilidade:
 * customExpress.js = configurar o express
 */
