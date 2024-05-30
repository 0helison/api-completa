import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';
import DeleteCustomerService from './DeleteCustomerService';
import AppError from '@shared/errors/AppError';

describe('DeleteCustomerService', () => {
  let fakeCustomersRepository: FakeCustomersRepository;
  let deleteCustomerService: DeleteCustomerService;
  let createCustomerService: CreateCustomerService;

  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    deleteCustomerService = new DeleteCustomerService(fakeCustomersRepository);
    createCustomerService = new CreateCustomerService(fakeCustomersRepository);
  });

  it('must be able to delete an existing customer', async () => {
    const customerData = {
      name: 'Carlos Antônio',
      email: 'carlos@gmail.com',
    };

    const customer = await createCustomerService.execute(customerData);

    await expect(
      deleteCustomerService.execute({ id: customer.id }),
    ).resolves.not.toThrow();

    const foundCustomer = await fakeCustomersRepository.findById(customer.id);
    expect(foundCustomer).toBeNull();
  });

  it('should not be able to delete a non-existent customer', async () => {
    await expect(
      deleteCustomerService.execute({ id: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
