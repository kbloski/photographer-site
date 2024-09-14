import { Album } from "../models/AlbumModel";
import { Photo } from "../models/PhotoModel";
import { PhotoType } from "../types/PhotoType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class PhotoController extends AbstractCrudController<Photo>{
    constructor(){
        super(Photo);
    }

    async create(data: Omit<PhotoType, "id">): Promise<Photo | null> {
        return super.create(data);
    }

    async getAllByAlbumId( albumId: string) : Promise< Photo[] | null>{
        return await Photo.findAll({where: { album_id: albumId}})
    }

    async updateById (id: number, data: Partial<Photo>) : Promise<number> {
        return await super.updateById(id, data);
    };

    async deleteAllByAlbumId( albumId: string) : Promise<number> {
        return await Photo.destroy( {where: { album_id: albumId }})
    }
}