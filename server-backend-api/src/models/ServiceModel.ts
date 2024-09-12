import { ServiceType } from "../types/ServiceType";
import { sequelize } from "../utils/db";
import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from "sequelize";

export class Service
    extends Model<
        InferAttributes<Service>,
        InferCreationAttributes<Service>
    >
    implements ServiceType
{
    declare id: number;
    declare price?: number;
    declare name: string;
    declare description?: string;
}

Service.init(
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
    },
    { sequelize }
);
