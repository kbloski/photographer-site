import { AlbumInterface } from "../types/AlbumType";
import { sequelize } from "../utils/db";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

export class Album
    extends Model<InferAttributes<Album>, InferCreationAttributes<Album>>
    implements AlbumInterface
{
    declare id: number;
    declare name: string;
    declare description: string;
    declare user_id?: number;
}

Album.init(
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true,
            },
        },
    },
    {
        sequelize,
    }
);
