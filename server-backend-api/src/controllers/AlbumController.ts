import { Album } from "../models/AlbumModel";
import { AlbumType } from "../types/AlbumType";
import { UserType } from "../types/UserType";
import { AbstractCrudController } from "./AbstrctCrudController";

export class AlbumController extends AbstractCrudController<Album> {
    constructor() {
        super(Album);
    }

    async create(data: Omit<AlbumType, "id">): Promise<Album | null> {
        return super.create(data);
    }

    async getByUserId(userId: number): Promise<Album[] | null> {
        return await Album.findAll({ where: { user_id: userId } });
    }

    async updateUser(albumDb: AlbumType, userDb: UserType): Promise<number> {
        return await this.updateById(albumDb.id, { user_id: userDb.id });
    }

    updateById = async (
        id: number,
        data: Partial<AlbumType>
    ): Promise<number> => {
        return await super.updateById(id, data);
    };
}
