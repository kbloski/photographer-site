import { Album } from "../models/AlbumModel";
import {  AbstractCrudController } from "./abstractCrudController";

export class AlbumController extends AbstractCrudController<Album>{
    constructor(){
        super(Album);
    };
};