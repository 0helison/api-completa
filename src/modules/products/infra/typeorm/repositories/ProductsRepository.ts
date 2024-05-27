import { EntityRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';
import IFindProducts from '@modules/products/interfaces/IFindProducts';

@EntityRepository(Product)
class ProductRepository extends Repository<Product> {
  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productIds = await products.map(product => product.id);

    const existsProducts = await this.find({
      where: {
        id: In(productIds),
      },
    });

    return existsProducts;
  }
}

export default ProductRepository;
