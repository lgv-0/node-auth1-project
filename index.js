const express = require("express");
const server = express();

server.use(express.json());

server.use("/api/register", require("./routes/register"));

server.get("/api", (req, res)=>
{
    res.status(200).send("ok");
});

server.listen(5000);