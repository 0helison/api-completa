import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import IRequestCustomerIdAndListProductsQuantity from '../interfaces/IRequestCustomerIdAndListProductsQuantity';
import Order from '../typeorm/entities/Orders';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';

class CreateOrderService {
  public async execute({
    customer_id,
    products,
  }: IRequestCustomerIdAndListProductsQuantity): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customersRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductRepository);

    const customerExists = await customersRepository.findById(customer_id);

    if (customerExists) {
      throw new AppError('Could not find any customer with the given id');
    }

    const existsProducts = await productsRepository.findAllByIds(products);
  }
}

export default CreateOrderService;
