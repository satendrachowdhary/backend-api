const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "satendra",
    password: "password",
    database: "smartbrain"
  }
});
const register = require("./controllers/register.js");
const signin = require("./controllers/signin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const saltRounds = 10;

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  register.handleRegister(req, res, bcrypt, db, saltRounds);
});

app.get("/profile/:id", (req, res) => {
  profile.handleGetProfile(req, res, db);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, bcrypt, db);
});

app.put("/image", (req, res) => {
  image.handleImageCount(req, res, db);
});

// app.post("/signin", (req, res) => {
//   db.select("email", "hash")
//     .from("login")
//     .where("email", "=", req.body.email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
//       if (isValid) {
//         db.select("*")
//           .from("users")
//           .where("email", "=", req.body.email)
//           .then(user => res.json(user[0]))
//           .catch(err => res.status(400).json("unable to get users"));
//       } else {
//         res.status(400).json("wrong info");
//       }
//     })
//     .catch(err => res.status(400).json("wrong credentials"));
// });

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
