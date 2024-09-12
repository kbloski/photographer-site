import { AlbumModel } from "../models/AlbumModel";
import {  AbstractCrudController } from "./abstractCrudController";

export class AlbumController extends AbstractCrudController<AlbumModel>{
    constructor(){
        super(AlbumModel);
    };
};