const DB = require("knex")(require("../knexfile").development);

function GetUsers()
{
    return DB.select("*").from("users");
}

function GetUserBy(filter)
{
    return DB.select("*").where(filter).from("users").first();
}

function AddUser(user)
{
    return DB.insert(user).into("users");
}

module.exports =
    {
        GetUsers,
        GetUserBy,
        AddUser
    }