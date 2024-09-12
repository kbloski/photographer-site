import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

const Photo = sequelize.define("album", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {},
    },
    title: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [2, 64],
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1024],
        },
    },
});

export { Photo };
