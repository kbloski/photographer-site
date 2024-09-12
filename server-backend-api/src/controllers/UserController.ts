import {  AbstractCrudController } from "./abstractCrudController";
import { User } from "../models/UserModel";
import { UserType } from "../types/UserType";
import bcrypt from "bcrypt";

export class UserController extends AbstractCrudController<User> {
    constructor() {
        super(User);
    }

    updateById = async (id: number, data: Partial<UserType>) : Promise<[affectedCount: number]> => {
        return await this.updateById(id, data)
    }

    // @ts-ignore
    async create(data: UserType): Promise<User | null> {
        try {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(String(data.password), salt);

            // @ts-ignore
            return await this.model.create(data);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        return await this.model.findOne({ where: { email } });
    }

    async validPassword(password: string, userDb: User): Promise<boolean> {
        return await bcrypt.compare(password, userDb.password);
    }
}
