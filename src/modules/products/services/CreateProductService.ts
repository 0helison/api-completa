import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { IResquestBodyNoId } from '../interfaces/IResquestBodyNoId';

class CreateProductService {
  public async execute({
    name,
    price,
    quantity,
  }: IResquestBodyNoId): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
