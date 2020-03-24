const express = require("express");
const server = express();
const fs = require("fs");

process.env.PRIVATEKEY = fs.readFileSync(require("path").join(__dirname, "/keys/rs512.key"), 'utf8');
process.env.PUBLICKEY = fs.readFileSync(require("path").join(__dirname, "/keys/rs512.key.pub"), 'utf8');

server.use(express.json());

const sessionConfig =
{
    name: "nothing",
    secret: "just a secret bro!",
    cookie: {
        maxAge: 1000 * 60 * 60,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true
};

server.use(require("express-session")(sessionConfig));
const restrictedMiddle = require("./middleware/restricted");

server.use("/api/users", restrictedMiddle, require("./routes/users"));
server.use("/api/register", require("./routes/register"));
server.use("/api/login", require("./routes/login"));

server.get("/api", (req, res)=>
{
    res.status(200).send("ok");
});

server.listen(5000);