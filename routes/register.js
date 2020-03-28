const express = require("express");
const router = express();
const Crypt = require("bcryptjs");
const DBHandle = require("../data/dbhandle");

router.post("/", (req, res)=>
{
    DBHandle.AddUser({ username:req.body.username, password:Crypt.hashSync(req.body.password)
    }).then((response)=>
    {
        res.status(200).json(response);
    }).catch(()=>
    {
        res.status(500).send("Internal server error");
    });
});

module.exports = router;