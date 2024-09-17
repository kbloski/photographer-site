import { Service } from "../models/ServiceModel";
import { ServiceType } from "../types/ServiceType";
import {  AbstractCrudController } from "./AbstrctCrudController";

export class ServiceController extends AbstractCrudController<Service> 
{
    constructor (){
        super(Service);
    }

    create(data: Omit<ServiceType, "id">): Promise<Service | null> {
        return super.create(data);
    }

    updateById = async (id: number, data: Partial<ServiceType>): Promise< number> =>  {
        return await super.updateById(id, data);
    };
}