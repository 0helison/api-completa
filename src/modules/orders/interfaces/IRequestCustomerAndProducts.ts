import Customer from '@modules/customers/typeorm/entities/Customer';
import IProducts from './IProduct';

export default interface IRequestCustomerAndProduct {
  customer: Customer;
  products: IProducts[];
}
