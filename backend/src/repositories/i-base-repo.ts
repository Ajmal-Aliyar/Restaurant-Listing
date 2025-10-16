import {
  CreateOptions,
  DestroyOptions,
  FindOptions,
  UpdateOptions,
} from "sequelize";

export interface IBaseRepository<T> {
  create(
    data: Partial<T>,
    options?: CreateOptions
  ): Promise<T>;
  findAll(options?: FindOptions): Promise<T[]>;

  findOne(options: FindOptions): Promise<T | null>;

  findById(id: number | string): Promise<T | null>;

  updateById(
    id: number | string,
    data: Partial<T>,
    options?: UpdateOptions
  ): Promise<T | null>;

  updateMany(
    data: Partial<T>,
    options: UpdateOptions
  ): Promise<number>;

  deleteById(id: number | string, options?: DestroyOptions): Promise<boolean>;

  deleteMany(options: DestroyOptions): Promise<number>;

  count(options?: FindOptions): Promise<number>;

  exists(options: FindOptions): Promise<boolean>;

  paginate(
    page: number,
    limit: number,
    options: FindOptions
  ): Promise<{ data: T[]; total: number; page: number; limit: number }>;
}
