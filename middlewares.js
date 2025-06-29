const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();

const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || "";

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect("/?error=1");
  }
};

const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect("/?error=2");
  }
};

const setup = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "secretoSuperSegreto",
      resave: false,
      saveUninitialized: true,
    })
  );

  app.use((req, res, next) => {
    next();
  });

  app.use((req, res, next) => {
    next();
  });
};

module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setup,
};
