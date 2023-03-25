const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "ammene27",
  database: "CRUDDataBase",
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
  });
});

app.delete("/api/delete/:name", (req, res) => {
  const mName = req.params.name;
  console.log("movie name delete", mName);

  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=?";
  db.query(sqlDelete, mName, (err, result) => {
    console.log(err);
  });
});

app.put("/api/update", (req, res) => {
  const upadteData = req.body.upadteData;
  const mName = req.body.name;
  console.log("movie name delete", mName);

  const sqlPut = "UPDATE movie_reviews SET  movieReview = ? WHERE movieName=?";
  db.query(sqlPut, [upadteData, mName], (err, result) => {
    console.log(err);
  });
});
app.post("/api/insert", (req, res) => {
  const mName = req.body.movieName;
  const mReview = req.body.movieReview;
  console.log("data in server", mName, mReview);
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)";
  db.query(sqlInsert, [mName, mReview], (err, result) => {});
});

app.listen(3001, () => {
  console.log("Running on server 3001");
});
