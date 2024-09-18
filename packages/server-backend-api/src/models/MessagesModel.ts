import { MessageInterface, MessageStatus } from "shared/src/types/MessageType";
import { sequelize } from "../utils/db";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

const statusArr = Object.values(MessageStatus);

export class Message
    extends Model<InferAttributes<Message>, InferCreationAttributes<Message>>
    implements MessageInterface
{
    declare id: number;
    declare email: string;
    declare subject: string;
    declare status: MessageStatus;
    declare message?: string;
    declare sender_id?: number;
    declare recipient_id?: number;
}

Message.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                isInt: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [5, 128],
            },
        },
        subject: {
            type: DataTypes.STRING(124),
            allowNull: false,
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [0, 1024],
            },
        },
        status: {
            type: DataTypes.ENUM(...statusArr),
            allowNull: false,
            defaultValue: MessageStatus.NEW,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        recipient_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
    }
);
