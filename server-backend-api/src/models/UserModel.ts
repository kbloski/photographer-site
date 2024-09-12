import { sequelize } from "../utils/db";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from "sequelize";
import { UserRoles, UserType } from "../types/UserType";

export class User
    extends Model<
        InferAttributes<User>,
        InferCreationAttributes<User>
    >
    implements UserType
{
    declare id: number;
    declare role: UserRoles;
    declare username: string;
    declare email: string;
    declare password: string;
    declare phone: string; 
}

User.init({
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
        type: DataTypes.ENUM(...Object.values(UserRoles)),
        allowNull: false,
        defaultValue: UserRoles.CLIENT,
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
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [9, 15], 
        },
    },
}, {
    sequelize,
});
