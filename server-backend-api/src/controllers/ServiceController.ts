import { ServiceModel } from "../models/ServiceModel";
import {  AbstractCrudController } from "./abstractCrudController";

export class ServiceController extends AbstractCrudController<ServiceModel> {
    constructor (){
        super(ServiceModel);
    }
}