import { Model, ModelStatic, UpdateOptions, WhereOptions } from "sequelize";

// Definicja klasy abstrakcyjnej CRUD
export abstract class AbstractCrudController<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    create = async (data: Omit<any, "id">): Promise<T | null> => {
        try {
            if (data.id) delete data.id;

            // @ts-ignore
            return this.model.create(data);
        } catch (err) {
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

    async updateById (
        id: number,
        data: any
    ): Promise<number> {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return (await this.model.update(data, { where: whereOption }))[0];
    };

    deleteById = async (id: number): Promise<number> => {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return this.model.destroy({ where: whereOption });
    };
}
