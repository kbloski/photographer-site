import { Message } from "../models/MessagesModel";
import { AbstractCrudController } from "./AbstrctCrudController";

export class MessageController extends AbstractCrudController<Message> {
    constructor(){
        super(Message);
    };

    updateById = async (id: number, data: Partial<Message>) : Promise<number> => {
        return await super.updateById(id, data);
    };
}