import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Orders';
import IRequestCustomerAndProduct from '@modules/orders/interfaces/IRequestCustomerAndProducts';

@EntityRepository(Order)
class OrdersRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['customer', 'orders_products'],
    });

    return order;
  }

  public async createOrder({
    customer,
    products,
  }: IRequestCustomerAndProduct): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}

export default OrdersRepository;
