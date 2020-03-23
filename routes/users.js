const express = require("express");
const router = express();
const DBHandle = require("../data/dbhandle");

router.get("/", (req, res)=>
{
    DBHandle.GetUsers().then((response)=>
    {
        res.status(200).json(response);
    }).catch(()=>
    {
        res.status(500).send("Internal server error");
    })
});

module.exports = router;