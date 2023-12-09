const express = require("express");
const path = require("path");
const mysql = require("mysql2");
const morgan = require('morgan');
const cors = require('cors')
const app = express();
const port = 8080;

// Middleware
app.use(cors())
app.use(express.static(path.join(__dirname, 'src/public')));

//HTTP logger
app.use(morgan('combined'));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "tour",
});

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
    }
    console.log("Connected to MySQL as id " + connection.threadId);
});


app.get("/api/data", (req, res) => {
    const sql = "SELECT * FROM tour";
    connection.query(sql, (err, results) => {
        if (err) {
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
