import { PhotoModel } from "../models/PhotoModel";
import { AbstractCrudController } from "./abstractCrudController";

export class PhotoController extends AbstractCrudController<PhotoModel>{
    constructor(){
        super(PhotoModel);
    }
}