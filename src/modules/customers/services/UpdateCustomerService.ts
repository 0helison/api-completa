import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import IRequestCustomerData from '../interfaces/IRequestCustomerData';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IRequestCustomerData): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.');
    }

    const customerExistsEmail = await customersRepository.findByEmail(email);

    if (customerExistsEmail && customer.email !== email) {
      throw new AppError('There is already one customer with this email.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
