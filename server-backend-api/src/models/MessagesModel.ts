import { MessageStatus, MessageType  } from "../types/MessageType";
import { sequelize } from "../utils/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

const statusArr = Object.values(MessageStatus);

export class Message 
extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>
implements MessageType {
    declare id?: number;
    declare name?: string;
    declare email?: string;
    declare message?: string
    declare subject?: string;
    declare status?: MessageStatus
}

Message.init({
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
        defaultValue: MessageStatus.NEW
    }
}, {
    sequelize
});
