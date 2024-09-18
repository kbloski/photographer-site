import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { ReactionEmotions, ReactionType } from 'shared/src/types/ReactionType';
import { sequelize } from "../utils/db";

const reactionArr = Object.values(ReactionEmotions);

export class Reaction 
extends Model<
    InferAttributes<Reaction>, 
    InferCreationAttributes<Reaction>
> implements ReactionType {
    declare id: number | undefined;
    declare reaction: ReactionEmotions;
    declare user_id: number | undefined;
    declare photo_id: number | undefined;
    declare album_id: number | undefined;
    
}

Reaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        reaction: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true,
                isIn: [reactionArr]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
        photo_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isInt: true
            }
        },
    },
    {
        sequelize
    }
)