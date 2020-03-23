const express = require("express");
const router = express();
const DBHandle = require("../data/dbhandle");

router.get("/", (req, res)=>
{
    res.status(200).send("Good");
});

module.exports = router;