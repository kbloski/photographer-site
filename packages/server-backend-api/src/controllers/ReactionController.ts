import { ReactionEmotions, ReactionType } from "shared/src/types/ReactionType";

import { Reaction } from "../models/Reactions";
import { AbstractCrudController } from "./AbstrctCrudController";

export class ReactionController extends AbstractCrudController<Reaction> {
    constructor(){
        super(Reaction);
    }

    async getAllByEmotion( emotion: ReactionEmotions) : Promise<ReactionType[]>{
        return await this.model.findAll( { where: { reaction: emotion }})
    }

    async deleteAllByAlbumId( albumId: number){
        await this.model.destroy( {where: {album_id: albumId}});
    }

    async deleteAllByPhotoId( photoId: number){
        await this.model.destroy( {where: {photo_id: photoId}});
    }

}