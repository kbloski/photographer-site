import { Model, ModelStatic, UpdateOptions, WhereOptions } from "sequelize";

// Definicja klasy abstrakcyjnej CRUD
export abstract class AbstractCrud<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    create = (data: Partial<T>): Promise<T> => {
        // @ts-ignore
        return this.model.create(data);
    };

    getAll = async (): Promise<T[]> => {
        return await this.model.findAll();
    };

    getById = async (id: number): Promise<T | null> => {
        return await this.model.findByPk(id);
    };

    updateById = async (
        id: number,
        data: Partial<T>
    ): Promise<[affectedCount: number]> => {
        const whereClause: WhereOptions = { id } as WhereOptions;
        return this.model.update(data, { where: whereClause });
    };

    deleteById = async (id: number): Promise<number> => {
        const whereClause: WhereOptions = { id } as WhereOptions;
        return this.model.destroy({ where: whereClause });
    };
}
