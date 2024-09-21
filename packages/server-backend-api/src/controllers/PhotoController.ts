import { Photo } from "../models/PhotoModel";
import { PhotoType } from "shared/src/types/PhotoType";
import { AbstractCrudController } from "./AbstrctCrudController";
import { sequelize } from "../utils/db";
import {  reactionController } from "./controllers";

export class PhotoController extends AbstractCrudController<Photo> {
    constructor() {
        super(Photo);
    }

    async create(data: Omit<PhotoType, "id">): Promise<Photo | null> {
        return await super.create(data);
    }

    async getAllByAlbumId(albumId: number): Promise<Photo[]> {
        return await Photo.findAll({ where: { album_id: albumId } });
    }

    async getInRangeByAlbumId(albumId: number, offset: number = 0, limit: number = 10): Promise<Photo[]> {
        return await Photo.findAll({ 
            where: { album_id: albumId }, 
            offset,
            limit
        });
    }

    async updateById(id: number, data: Partial<Photo>): Promise<number> {
        return await super.updateById(id, data);
    }

    async deleteAllByAlbumId(albumId: number) {
        const transaction = await sequelize.transaction();
        try {
            const photosIn = await this.getAllByAlbumId( albumId );
            
            for(const photo of photosIn){
                await reactionController.deleteAllByPhotoId( photo.id );
            }

            const destoryed = await Photo.destroy({ where: { album_id: albumId } });
            await transaction.commit();
            return destoryed;
        } catch (err){
            await transaction.rollback();
            throw new Error('Error delete all by album id for photoController');
        }
    }
}
