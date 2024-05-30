import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import AppError from '@shared/errors/AppError';

describe('CreateCustomerService', () => {
  let fakeCustomersRepository: FakeCustomersRepository;
  let createCustomerService: CreateCustomerService;

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });

  it('should be able to create a new customer', async () => {
    const customerData = {
      name: 'Carlos',
      email: 'carlos@gmail.com',
    };

    const customer = await createCustomerService.execute(customerData);

    expect(customer).toHaveProperty('id');
    expect(customer.name).toBe('Carlos');
    expect(customer.email).toBe('carlos@gmail.com');
  });

  it('should not be able to create two customers with the same email', async () => {
    const customerData = {
      name: 'Carlos Antônio',
      email: 'carlos@gmail.com',
    };

    await createCustomerService.execute(customerData);

    await expect(
      createCustomerService.execute(customerData),
    ).rejects.toBeInstanceOf(AppError);
  });
});
