import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { ICustomersRepository, SearchParams } from '../ICustomersRepository';
import { ICreateCustomer } from '../../models/ICreateCustomer';
import { ICustomerPaginate } from '../../models/ICustomerPaginate';

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [];

  public async findByName(name: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer || null;
  }

  public async findById(id: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer || null;
  }

  public async findByEmail(email: string): Promise<Customer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer || null;
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();
    Object.assign(customer, { id: 'uuid', name, email });

    this.customers.push(customer);
    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers[findIndex] = customer;
    return customer;
  }

  public async remove(customer: Customer): Promise<void> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );
    this.customers.splice(findIndex, 1);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const data = this.customers.slice(skip, skip + take);
    const total = this.customers.length;

    return {
      per_page: take,
      total,
      current_page: page,
      data,
    };
  }
}

export default FakeCustomersRepository;
