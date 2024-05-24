import IProductQuantity from './IProductQuantity';

export default interface IRequestCustomerIdAndListProductsQuantity {
  customer_id: string;
  products: IProductQuantity[];
}
