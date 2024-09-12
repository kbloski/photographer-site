import { AlbumType } from "../types/AlbumType";
import { sequelize } from "../utils/db";
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

export class AlbumModel 
extends Model<InferAttributes<AlbumModel>, InferCreationAttributes<AlbumModel>>
implements AlbumType
{
    declare id: number;
    declare name?: string;
    declare description?: string;
} 

AlbumModel.init(
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
    },
    {
        sequelize
    }
)
