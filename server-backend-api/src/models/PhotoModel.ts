import { PhotoType } from "../types/PhotoType";
import { sequelize } from "../utils/db";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

export class PhotoModel
    extends Model<
        InferAttributes<PhotoModel>,
        InferCreationAttributes<PhotoModel>
    >
    implements PhotoType
{
    declare id: number;
    declare url?: string;
    declare title?: string;
    declare description?: string;
}

PhotoModel.init(
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
    },
    {
        sequelize,
    }
);
