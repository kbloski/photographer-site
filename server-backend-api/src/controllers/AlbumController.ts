import { Album } from "../models/AlbumModel";
import { AbstractCrudController } from "./AbstrctCrudController";

export class AlbumController extends AbstractCrudController<Album> {
    constructor() {
        super(Album);
    }

    updateById = async (id: number, data: Partial<Album>): Promise< number> => {
        return await super.updateById(id, data);
    };
}
