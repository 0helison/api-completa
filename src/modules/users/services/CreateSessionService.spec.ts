import 'reflect-metadata';
import FakeUsersRepository from '@modules/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

describe('CreateSession', () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createSessionService: CreateSessionsService;
  let fakeHashProvider: FakeHashProvider;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSessionService = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const userData = {
      name: 'Maria',
      email: 'maria@gmail.com',
      password: await fakeHashProvider.generateHash('123456'),
    };

    const user = await fakeUsersRepository.create(userData);

    const response = await createSessionService.execute({
      email: 'maria@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    await expect(
      createSessionService.execute({
        email: 'maria@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const userData = {
      name: 'Maria',
      email: 'maria@gmail.com',
      password: await fakeHashProvider.generateHash('123456'),
    };
    await fakeUsersRepository.create(userData);

    await expect(
      createSessionService.execute({
        email: 'maria@gmail.com',
        password: '567890',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
