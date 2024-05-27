import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Orders';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';
import IRequestId from '../interfaces/IRequestId';

class ShowOrderService {
  public async execute({ id }: IRequestId): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found');
    }

    return order;
  }
}

export default ShowOrderService;
