import { Sequelize } from "sequelize";

const db = new Sequelize('auth_db','authdb','qwerty123QAZ',{
    host: "34.171.140.15",
    dialect: "mysql"
});

export default db;
