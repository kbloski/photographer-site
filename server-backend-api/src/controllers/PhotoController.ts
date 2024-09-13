import { Photo } from "../models/PhotoModel";
import { AbstractCrudController } from "./AbstrctCrudController";

export class PhotoController extends AbstractCrudController<Photo>{
    constructor(){
        super(Photo);
    }

    updateById = async (id: number, data: Partial<Photo>) : Promise<[ number]> =>  {
        return await super.updateById(id, data);
    };
}