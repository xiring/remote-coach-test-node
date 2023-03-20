import { SqlEntityRepository } from "@mikro-orm/knex";
import {
  AnyEntity,
  FilterQuery,
  FindOneOptions,
  FindOneOrFailOptions,
  FindOptions,
  RequiredEntityData,
  wrap,
} from "@mikro-orm/core";
import HttpException from "@utils/exceptions/http.exception";

class BaseRepository<T extends AnyEntity<T>> extends SqlEntityRepository<T> {
  findEntry = async <P extends string = never>(
    where: FilterQuery<T>,
    options?: FindOneOptions<T, P>,
  ) => {
    return await this.findOne(
      Object.assign(where ?? {}, {
        isDeleted: false,
      }) as unknown as FilterQuery<T>,
      options,
    );
  };

  findEntries = async <P extends string = never>(
    where?: FilterQuery<T>,
    options?: FindOptions<T, P>,
  ) => {
    return await this.find(
      Object.assign(where ?? {}, {
        isDeleted: false,
      }) as unknown as FilterQuery<T>,
      options,
    );
  };

  findEntryOrFail = async <P extends string = never>(
    where: FilterQuery<T>,
    message: string,
    options?: FindOneOrFailOptions<T, P>,
  ) => {
    const data = await this.findEntry(where, options);
    if (!data) throw new HttpException(404, message);
    return data;
  };

  createEntry = async (entry: RequiredEntityData<T>) => {
    const data = this.create(entry);
    await this.persistAndFlush(data);
    return data;
  };

  deleteEntry = async (entity: T) => {
    const data = wrap(entity).assign({ isDeleted: true } as any);
    await this.flush();
    return data;
  };

  updateEntry = async (entity: T, fields: RequiredEntityData<T>) => {
    const data = wrap(entity).assign(fields);
    await this.flush();
    return data;
  };
}

export default BaseRepository;
