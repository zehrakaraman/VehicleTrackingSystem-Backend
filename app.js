const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: "account",
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM customer WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                console.log(`Error: ${err}`)
                res.send({ err: err })
            }

            if (result.length > 0) {
                res.send({ message: "Logged in successfully." });
            } else {
                res.send({ message: "Wrong username/password combination!" });
            }

        }
    );
});

app.listen(5000, () => {
    console.log("running server");
});