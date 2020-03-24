const express = require("express");
const router = express();
const Crypt = require("bcryptjs");
const DBHandle = require("../data/dbhandle");
const jwt = require("jsonwebtoken");
const fs = require("fs");

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
            const token = generateToken(response);

            res.status(200).json({msg:"ok!", token});
        }
        else
            res.status(404).send("Invalid credentials");
    }).catch((err)=>
    {
        console.log(err);
        res.status(500).send("Internal server error");
    })
});

function generateToken(user)
{
    const payload =
    {
        username: user.username
    }

    let privateKEY  = fs.readFileSync(require("path").join(__dirname, "../keys/rs512.key"), 'utf8');

    const options =
    {
        algorithm: "RS512",
        expiresIn: "1h"
    }

    return jwt.sign(payload, {key:privateKEY, passphrase:"secret"}, options);
}

module.exports = router;