const DB = require("knex")(require("../knexfile").development);

function GetUsers()
{
    return DB.select("*").from("users");
}

function AddUser(user)
{
    return DB.insert(user).into("users");
}

module.exports =
    {
        GetUsers,
        AddUser
    }