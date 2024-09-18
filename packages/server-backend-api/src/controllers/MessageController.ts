import { WhereOptions } from "sequelize";
import { Message } from "../models/MessagesModel";
import { MessageStatus, MessageType } from "shared/src/types/MessageType";
import { UserType } from "shared/src/types/UserType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class MessageController extends AbstractCrudController<Message> {
    constructor() {
        super(Message);
    }

    create(data: Omit<MessageType, "id">): Promise<Message | null> {
        return super.create(data);
    }

    async getAllByRecipientId(
        recipientId: number,
        status?: MessageStatus
    ): Promise<Message[] | null> {
        const optionsWhere: WhereOptions = {
            recipient_id: recipientId,
        };

        if (status) optionsWhere.status = status;

        return await Message.findAll({
            where: optionsWhere,
        });
    }

    async updateById(id: number, data: Partial<MessageType>): Promise<number> {
        return await super.updateById(id, data);
    }

    async setSender(messageDb: MessageType, sender: UserType): Promise<number> {
        return this.updateById(messageDb.id, {
            sender_id: sender.id,
        });
    }

    async setRecipient(
        messageDb: MessageType,
        recipient: UserType
    ): Promise<number> {
        return await this.updateById(messageDb.id, {
            recipient_id: recipient.id,
        });
    }
}
