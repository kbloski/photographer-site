import { Album } from "../models/AlbumModel";
import { AlbumType } from "../types/AlbumType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class AlbumController extends AbstractCrudController<Album> {
    constructor() {
        super(Album);
    }

    create(data: Omit<AlbumType, "id">): Promise<Album | null> {
        return super.create(data);
    }

    updateById = async (id: number, data: Partial<Album>): Promise< number> => {
        return await super.updateById(id, data);
    };
}
