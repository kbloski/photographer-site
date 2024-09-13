import {  AbstractCrudController } from "./AbstrctCrudController";
import { User } from "../models/UserModel";
import { UserType } from "../types/UserType";
import bcrypt from "bcrypt";

class UserService {
    private static SALT_ROUNDS = 10;
    private static GEN_SALT = bcrypt.genSaltSync(this.SALT_ROUNDS);

    static async validPassword( password: string, hashedPassword : string) : Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword )
    }
    
    static async hashPassword( password: string) : Promise<string>{
        return await bcrypt.hash(password, UserService.GEN_SALT);
    }
}

export class UserController extends AbstractCrudController<User> {
    constructor() {
        super(User);
    }

    async updateById (id: number, data: Partial<UserType>) : Promise<[number]> {
        if (data.password) data.password = await UserService.hashPassword(data.password);

        return await super.updateById(id, data);
    }

    // @ts-ignore
    async create(data: Omit<UserType, 'id' | 'role'>): Promise<User | null> {
        try {
            // const salt = await bcrypt.genSalt(10);
            data.password = await UserService.hashPassword(data.password);

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
        return await UserService.validPassword(password, userDb.password);
    }
}
