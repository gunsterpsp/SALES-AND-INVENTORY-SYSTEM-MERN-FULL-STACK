import {Sequelize} from "sequelize";

const db = new Sequelize('app_db', 'sa', '123', {
    host: "localhost",
    dialect: "mssql"
});

export default db;