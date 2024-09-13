import { Photo } from "../models/PhotoModel";
import { PhotoType } from "../types/PhotoType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class PhotoController extends AbstractCrudController<Photo>{
    constructor(){
        super(Photo);
    }

    create(data: Omit<PhotoType, "id">): Promise<Photo | null> {
        return super.create(data);
    }

    updateById = async (id: number, data: Partial<Photo>) : Promise<number> =>  {
        return await super.updateById(id, data);
    };
}