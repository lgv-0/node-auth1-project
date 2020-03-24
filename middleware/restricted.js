const jwt = require("jsonwebtoken");
const fs = require("fs");

module.exports = (req, res, next) =>
{
    const { authorization } = req.headers;

    let publicKEY = fs.readFileSync(require("path").join(__dirname, "../keys/rs512.key.pub"), 'utf8');

    if (authorization)
    {
        jwt.verify(authorization, publicKEY, {algorithms:["RS512"]}, (err, decodedToken)=>
        {
            if (!err)
            {
                console.log(decodedToken);
                next();
            }
            else
                res.status(401).send("You shall not pass!");
        });
    }
    else
        res.status(400).send("NO creds");
}