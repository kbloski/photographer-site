import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from "../config";


const sequelize = new Sequelize({
    database: DATABASE_NAME,
    dialect: 'mysql',
    host: DATABASE_HOST,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT
});

sequelize.authenticate()
.then( ()=> console.log(`Connected with database at port ${DATABASE_PORT}`))
.catch( err => console.error("unable to connect to the database", err));

export { sequelize };