import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { ISearchParamsListCustomers } from '../domain/models/ISearchParamsListCustomers';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}
  public async execute({
    page,
    limit,
  }: ISearchParamsListCustomers): Promise<ICustomerPaginate> {
    const take = limit;
    const skip = (Number(page) - 1) * take;
    const customers = await this.customersRepository.findAll({
      page,
      skip,
      take,
    });

    return customers;
  }
}

export default ListCustomerService;
