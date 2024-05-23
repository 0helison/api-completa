import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import IRequestId from '../interfaces/IRequestId';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class ShowCustomerService {
  public async execute({ id }: IRequestId): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    return customer;
  }
}

export default ShowCustomerService;
