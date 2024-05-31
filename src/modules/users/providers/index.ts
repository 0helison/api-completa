import { container } from 'tsyringe';

import { IHashProvider } from './HashProvider/models/IHashProvider';
import BcryptHashedProvider from './HashProvider/implementations/BcryptHashedProvider';

container.registerSingleton<IHashProvider>(
  'HashProvider',
  BcryptHashedProvider,
);
