import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

enum Roles {
    ADMIN = 'admin',
    CLIENT = 'client'
}
const rolesArr: string[] = Object.values(Roles);

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    role: {
        type: DataTypes.ENUM(...rolesArr),
        allowNull: false,
        defaultValue: Roles.CLIENT,
    },
    username: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [2, 64],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,
        validate: {
            isEmail: true,
            len: [5, 128],
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
            len: [4, 128],
            notNull: { msg: "Password is needed" },
            notEmpty: { msg: "Please provide a password" },
            isNotEasy: function (value: string) {
                const arrSimplePasswords = ["haslo1234", "haslo4321", "haslo"];
                if (arrSimplePasswords.indexOf(value) != -1)
                    throw new Error("Password is too simple");
            },
        },
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            len: [9, 9],
        },
    },
});

export { 
    User,
    Roles
};
