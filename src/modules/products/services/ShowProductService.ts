import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import Product from '../infra/typeorm/entities/Product';
import { IRequestId } from '../interfaces/IRequestId';
import AppError from '@shared/errors/AppError';

class ShowProductService {
  public async execute({ id }: IRequestId): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    return product;
  }
}

export default ShowProductService;
