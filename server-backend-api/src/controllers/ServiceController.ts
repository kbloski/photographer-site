import { ServiceModel } from "../models/ServiceModel";
import { AbstractCrud } from "./abstractCrudController";

export class ServiceController extends AbstractCrud<ServiceModel> {
    constructor (){
        super(ServiceModel);
    }
}