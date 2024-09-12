import { Service } from "../models/ServiceModel";
import {  AbstractCrudController } from "./abstractCrudController";

export class ServiceController extends AbstractCrudController<Service> {
    constructor (){
        super(Service);
    }
}