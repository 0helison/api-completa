import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { IResquestBodyNoId } from '../interfaces/IRequestBodyNoId';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class CreateCustomerService {
  public async execute({ name, email }: IResquestBodyNoId): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);
    const emailExists = await customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const customer = customersRepository.create({
      name,
      email,
    });

    await customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerService;
