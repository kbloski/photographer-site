import { Model, ModelStatic, WhereOptions } from "sequelize";

// Definicja klasy abstrakcyjnej CRUD
export abstract class AbstractCrudController<T extends Model> {
    protected model: ModelStatic<T>;

    constructor(sequelizeModel: ModelStatic<T>) {
        this.model = sequelizeModel;
    }

    async create(data: Omit<any, "id">): Promise<T | null> {
        try {
            if (data.id) delete data.id;

            // @ts-ignore
            return this.model.create(data);
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async getAll(): Promise<T[] | null> {
        return await this.model.findAll();
    }

    async getById(id: number): Promise<T | null> {
        return await this.model.findByPk(id);
    }

    async findOneWhere( data: any ){
        return await this.model.findOne( {where: data})
    }

    async findAllWhere( data: any ){
        return await this.model.findAll( {where: data})
    }

    async updateById(id: number, data: any): Promise<number> {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return (await this.model.update(data, { where: whereOption }))[0];
    }

    async deleteById(id: number): Promise<number> {
        const whereOption: WhereOptions = { id } as WhereOptions;
        return this.model.destroy({ where: whereOption });
    }
}
