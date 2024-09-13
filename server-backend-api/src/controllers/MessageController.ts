import { Message } from "../models/MessagesModel";
import { MessageType } from "../types/MessageType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class MessageController extends AbstractCrudController<Message> {
    constructor(){
        super(Message);
    };

    create(data: Omit<MessageType, "id">): Promise<Message | null> {
        return super.create(data)
    }

    updateById = async (id: number, data: Partial<Message>) : Promise<number> => {
        return await super.updateById(id, data);
    };
}