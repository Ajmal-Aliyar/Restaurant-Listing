import { Model, ModelStatic, FindOptions, CreateOptions, UpdateOptions, DestroyOptions } from "sequelize";
import { IBaseRepository } from "./i-base-repo";

export class BaseRepository<T extends Model> implements IBaseRepository<T> {
  protected readonly model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async create(data: Partial<T["_creationAttributes"]>, options?: CreateOptions): Promise<T> {
    return await this.model.create(data as any, options);
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    return await this.model.findAll(options);
  }

  async findOne(options: FindOptions): Promise<T | null> {
    return await this.model.findOne(options);
  }

  async findById(id: number | string): Promise<T | null> {
    return await this.model.findByPk(id);
  }

  async updateById(id: number | string, data: Partial<T["_creationAttributes"]>, options?: UpdateOptions): Promise<T | null> {
    const instance = await this.model.findByPk(id);
    if (!instance) return null;

    await instance.update(data as any, options);
    return instance;
  }

  async updateMany(data: Partial<T["_creationAttributes"]>, options: UpdateOptions): Promise<number> {
    const [count] = await this.model.update(data as any, options);
    return count;
  }

  async deleteById(id: number | string, options?: DestroyOptions): Promise<boolean> {
    const deleted = await this.model.destroy({ where: { id } as any, ...options });
    return deleted > 0;
  }

  async deleteMany(options: DestroyOptions): Promise<number> {
    return await this.model.destroy(options);
  }

  async count(options?: FindOptions): Promise<number> {
    return await this.model.count(options);
  }

  async exists(options: FindOptions): Promise<boolean> {
    const record = await this.model.findOne(options);
    return !!record;
  }

  async paginate(
    page: number = 1,
    limit: number = 10,
    options: FindOptions = {}
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const offset = (page - 1) * limit;
    const { rows, count } = await this.model.findAndCountAll({
      ...options,
      limit,
      offset,
    });

    return {
      data: rows,
      total: count,
      page,
      limit,
    };
  }
}


