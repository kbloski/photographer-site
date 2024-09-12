import { ModelStatic } from "sequelize";
import { AbstractCrud } from "./abstractCrudController";
import { UserModel } from "../models/UserModel";
import { UserRoles, UserType } from "../types/UserType";
import bcrypt from 'bcrypt';


export class UserController extends AbstractCrud<UserModel> {
    constructor() {
        super(UserModel);
    }
    
    // @ts-ignore
    async create(data: UserType) : Promise<UserModel | null>{
        try {
            const salt = await bcrypt.genSalt(10);
            data.password = await bcrypt.hash(data.password, salt);

            // @ts-ignore
            return await this.model.create(data);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async getByEmail ( email: string) : Promise<UserModel | null> {
        return await this.model.findOne({where: {email}});
    }

    async validPassword(password: string, userDb: UserModel) : Promise<boolean> {
        return await bcrypt.compare(password, userDb.password )
    }
}
