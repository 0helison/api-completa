import ICreateOrder from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  create(data: ICreateOrder): Promise<IOrder>;
}
