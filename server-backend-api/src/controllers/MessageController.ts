import { Message } from "../models/MessagesModel";
import { MessageType } from "../types/MessageType";
import { UserType } from "../types/UserType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class MessageController extends AbstractCrudController<Message> {
    constructor(){
        super(Message);
    };

    create(data: Omit<MessageType, "id">): Promise<Message | null> {
        return super.create(data)
    }

    updateById = async (id: number, data: Partial<MessageType>) : Promise<number> => {
        return await super.updateById(id, data);
    };

    async setSender(messageDb : MessageType, sender : UserType ){
        return this.updateById(messageDb.id, {
            sender_id: sender.id
        });
    }

    async setRecipient(messageDb: MessageType, recipient : UserType)  {
        return await this.updateById(messageDb.id, {
            recipient_id: recipient.id
        })
    }
}