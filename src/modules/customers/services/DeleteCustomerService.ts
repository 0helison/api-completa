import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import IRequestId from '../interfaces/IRequestId';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class DeleteCustomerService {
  public async execute({ id }: IRequestId): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
