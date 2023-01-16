import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'sequelize-typescript';
import {
  CreateOptions,
  Model,
  FindOptions,
  UpdateOptions,
  FindAndCountOptions,
  DestroyOptions,
} from 'sequelize';

@Injectable()
export class AbstractService<T> {
  constructor(protected readonly model: Repository<T & Model>) {}

  async create(
    data: any,
    options?: CreateOptions<T>,
  ): Promise<Promise<T & Model>> {
    return this.model.create(data, options);
  }

  async findOne(options?: FindOptions<T>): Promise<T & Model> {
    return this.model.findOne(options);
  }

  async findAll(options?: FindOptions<T>): Promise<(T & Model)[]> {
    return this.model.findAll(options);
  }

  async throwIfExist(options?: FindOptions<T>): Promise<T & Model> {
    const record = await this.findOne(options);
    if (record) {
      throw new HttpException(
        { status: HttpStatus.CONFLICT, message: 'AlreadyExists' },
        HttpStatus.CONFLICT,
      );
    }
    return record;
  }

  async throwIfNotExist(options?: FindOptions<T>): Promise<T & Model> {
    const record = await this.findOne(options);
    if (!record) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return record;
  }

  async update(values, options: UpdateOptions<T>): Promise<T & Model> {
    await this.throwIfNotExist(options);
    await this.model.update(values, options);
    return this.findOne(options);
  }

  async destroy(options: DestroyOptions<T>): Promise<number> {
    const result = await this.model.destroy(options);
    if (!result) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, message: 'Not found' },
        HttpStatus.NOT_FOUND,
      );
    }
    return result;
  }

  async findAndCount(options: FindAndCountOptions<T>) {
    return this.model.findAndCountAll(options);
  }
}
