import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Samsoulgrave40!",
  database: "cakes",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/cakes", (req, res) => {
  const q = "SELECT * FROM cakes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/cakes", (req, res) => {
  const q = "INSERT INTO cakes(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/cakes/:id", (req, res) => {
  const cakeId = req.params.id;
  const q = " DELETE FROM cakes WHERE id = ? ";

  db.query(q, [cakeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/cakes/:id", (req, res) => {
  const cakeId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,cakeId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});