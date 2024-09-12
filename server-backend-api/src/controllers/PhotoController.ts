import { Photo } from "../models/PhotoModel";
import { AbstractCrudController } from "./abstractCrudController";

export class PhotoController extends AbstractCrudController<Photo>{
    constructor(){
        super(Photo);
    }
}