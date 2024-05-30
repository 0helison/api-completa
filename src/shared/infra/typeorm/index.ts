import { DataSource } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Orders';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrdersProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';

import { CreateProducts1716496482715 } from './migrations/1716496482715-CreateProducts';
import { CreateUsers1716496634310 } from './migrations/1716496634310-CreateUsers';
import { CreateUserTokens1716496821125 } from './migrations/1716496821125-CreateUserToken';
import { CreateCustomers1716496893233 } from './migrations/1716496893233-CreateCustomers';
import { CreateOrders1716501958048 } from './migrations/1716501958048-CreateOrders';
import { AddCustomerIdToOrders1716502293288 } from './migrations/1716502293288-AddCustomerIdToOrders';
import { CreateOrdersProducts1716505446602 } from './migrations/1716505446602-CreateOrdersProducts';
import { AddOrderIdToOrdersProducts1716506317378 } from './migrations/1716506317378-AddOrderIdToOrdersProducts';
import { AddProductIdToOrdersProducts1716506683689 } from './migrations/1716506683689-AddProductIdToOrdersProducts';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'apivendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1716496482715,
    CreateUsers1716496634310,
    CreateUserTokens1716496821125,
    CreateCustomers1716496893233,
    CreateOrders1716501958048,
    AddCustomerIdToOrders1716502293288,
    CreateOrdersProducts1716505446602,
    AddOrderIdToOrdersProducts1716506317378,
    AddProductIdToOrdersProducts1716506683689,
  ],
});

export { dataSource };
