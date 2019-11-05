const express = require("express");
const morgan = require("morgan");
const products = require("./api.json");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("combined"));

app.get("/", (req, res) => {
  res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const prods = products.products;
  prods.map(product => {
    if (product.id == id) {
      const p = product;
      return res.status(200).json(p);
    }
  });
  return res.status(401).json({ erro: "NOT FOUND" });
});

app.get("/products", (req, res) => {
  const { text } = req.query;
  const prod = [];
  const prods = products.products;
  if (text) {
    prods.map(product => {
      if (product.name.includes(text)) {
        prod.push(product);
      }
    });
    return res.status(200).json({ prod });
  }
  return res.status(401).json({ erro: "NOT FOUND" });
});

app.listen(3003);
