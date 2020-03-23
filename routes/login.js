const express = require("express");
const router = express();
const Crypt = require("bcryptjs");
const DBHandle = require("../data/dbhandle");

router.post("/", (req, res)=>
{
    DBHandle.GetUserBy({username:req.body.username}).then((response)=>
    {
        if (!response)
        {
            res.status(404).send("Invalid credentials");
            return;
        }
        
        if (Crypt.compareSync(req.body.password, response.password))
        {
            req.session.user =
            {
                id:response.id,
                username:response.username
            }
            res.status(200).send("Good!");
        }
        else
            res.status(404).send("Invalid credentials");
    }).catch((err)=>
    {
        console.log(err);
        res.status(500).send("Internal server error");
    })
});

module.exports = router;