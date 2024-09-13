import { Photo } from "../models/PhotoModel";
import { AbstractCrudController } from "./AbstrctCrudController";

export class PhotoController extends AbstractCrudController<Photo>{
    constructor(){
        super(Photo);
    }

    updateById = async (id: number, data: Partial<Photo>) : Promise<[affectedCount: number]> =>  {
        return await this.updateById(id, data);
    };
}