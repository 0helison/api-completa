import { getCustomRepository } from 'typeorm';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';
import { IRequestId } from '../interfaces/IRequestId';
import AppError from '@shared/errors/AppError';

class DeleteProductService {
  public async execute({ id }: IRequestId): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
