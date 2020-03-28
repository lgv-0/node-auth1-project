const jwt = require("jsonwebtoken");

module.exports = (req, res, next) =>
{
    const { authorization } = req.headers;

    if (authorization)
    {
        jwt.verify(authorization, process.env.PUBLICKEY, {algorithms:["RS512"]}, (err, decodedToken)=>
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