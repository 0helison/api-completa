import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/models/IHashProvider';
import BcryptHashedProvider from './HashProvider/implementations/bcryptHashedProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptHashedProvider,
);
