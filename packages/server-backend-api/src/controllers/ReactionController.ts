import {
    getReactionEmotionsValues,
    ReactionType,
} from "shared/src/types/ReactionType";

import { Reaction } from "../models/ReactionModel";
import { AbstractCrudController } from "./AbstrctCrudController";
import { where } from "sequelize";

export class ReactionController extends AbstractCrudController<Reaction> {
    constructor() {
        super(Reaction);
    }

    async create(data: Omit<ReactionType, "id">): Promise<Reaction | null> {
        for (const [key, value] of Object.entries(data) as [string, any][]) {
            // @ts-ignore
            if (!value) delete data[key];
        }

        return super.create(data);
    }

    async getByUserId( userId: number) : Promise<Reaction[]>
    {
        return await Reaction.findAll( { where: { user_id: userId}})
    }

    async findOneWhere(data: Partial<ReactionType>): Promise<Reaction | null> {
        return await super.findOneWhere( data );
    }

    async countByAlbumId(albumId: number) {
        const reactionArr = getReactionEmotionsValues();

        const result: any = {};

        for (const reaction of reactionArr) {
            result[String(reaction)] = await this.model.count({
                where: {
                    reaction: reaction,
                    album_id: albumId,
                },
            });
        }

        return result;
    }

    async countByPhotoId(photoId: number) {
        const reactionArr = getReactionEmotionsValues();

        const result: any = {};

        for (const reaction of reactionArr) {
            result[String(reaction)] = await this.model.count({
                where: {
                    reaction: reaction,
                    photo_id: photoId,
                },
            });
        }

        return result;
    }

    async deleteAllByAlbumId(albumId: number) {
        await this.model.destroy({ where: { album_id: albumId } });
    }

    async deleteAllByPhotoId(photoId: number) {
        await this.model.destroy({ where: { photo_id: photoId } });
    }
}
