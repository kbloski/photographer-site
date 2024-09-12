import { Model, ModelStatic, UpdateOptions, WhereOptions } from "sequelize";

// Definicja klasy abstrakcyjnej CRUD
export abstract class AbstractCrud<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    create = (data: Partial<T>): Promise<T> | null => {
        try {
            // @ts-ignore
            return this.model.create(data);
        } catch (err){
            console.error(err);
            return null;
        }
    };

    getAll = async (): Promise<T[] | null> => {
        return await this.model.findAll();
    };

    getById = async (id: number): Promise<T | null> => {
        return await this.model.findByPk(id);
    };

    updateById = async (
        id: number,
        data: Partial<T>
    ): Promise<[affectedCount: number]> => {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return this.model.update(data, { where: whereOption });
    };

    deleteById = async (id: number): Promise<number> => {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return this.model.destroy({ where: whereOption });
    };
}
