import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProducts } from './ICreateOrderProducts';

export default interface ICreateOrder {
  customer: ICustomer;
  products: ICreateOrderProducts[];
}
