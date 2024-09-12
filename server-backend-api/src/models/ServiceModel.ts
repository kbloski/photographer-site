import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

const Service = sequelize.define("service", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        validate: {
            isDecimal: true,
        },
    },
    name: {
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

export { Service };
