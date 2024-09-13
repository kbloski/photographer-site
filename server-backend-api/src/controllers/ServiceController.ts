import { Service } from "../models/ServiceModel";
import { ServiceType } from "../types/ServiceType";
import {  AbstractCrudController } from "./abstractCrudController";

export class ServiceController extends AbstractCrudController<Service> 
{
    constructor (){
        super(Service);
    }

    updateById = async (id: number, data: Partial<ServiceType>): Promise<[affectedCount: number]> =>  {
        return await this.updateById(id, data);
    };
}