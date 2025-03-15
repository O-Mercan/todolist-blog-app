const cors = require("cors");

// json-server'ın beklediği şekilde bir middleware fonksiyonu export ediyoruz
module.exports = (req, res, next) => {
  cors({
    origin: "http://localhost:1111",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
  })(req, res, next);
};