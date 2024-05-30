import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUserService: CreateUserService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const userData = {
      name: 'Maria',
      email: 'maria@gmail.com',
      password: await fakeHashProvider.generateHash('123456'),
    };

    const user = await createUserService.execute(userData);

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('Maria');
    expect(user.email).toBe('maria@gmail.com');
    expect(user.password).toBe('123456');
  });

  it('should not be able to create two customers with the same email', async () => {
    const userData = {
      name: 'Maria',
      email: 'maria@gmail.com',
      password: await fakeHashProvider.generateHash('123456'),
    };

    await createUserService.execute(userData);

    await expect(createUserService.execute(userData)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
