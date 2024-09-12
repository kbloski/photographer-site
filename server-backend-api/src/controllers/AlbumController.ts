import { Album } from "../models/AlbumModel";
import { AbstractCrudController } from "./abstractCrudController";

export class AlbumController extends AbstractCrudController<Album> {
    constructor() {
        super(Album);
    }

    updateById = async (id: number, data: Partial<Album>): Promise<[affectedCount: number]> => {
        return await this.updateById(id, data);
    };
}
