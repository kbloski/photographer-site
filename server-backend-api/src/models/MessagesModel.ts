import { sequelize } from "../utils/db";
import { DataTypes } from "sequelize";

// const status : string[] = ['new', 'read', 'archived'];
enum Status {
    NEW = 'new',
    READ = 'read',
    ARCHIVED = 'archived'
}

const statusArr = Object.values(Status);

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
            len: [2, 64],
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: false,
            len: [5, 128],
        },
    },
    subject: {
        type: DataTypes.STRING(124),
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
            len: [0, 1024],
        },
    },
    status: {
        type: DataTypes.ENUM( ...statusArr ),
        allowNull: false,
        defaultValue: Status.NEW
    }
});

export { 
    Message,
    Status
};
