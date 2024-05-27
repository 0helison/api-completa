import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import { IResquestBodyNoId } from '../interfaces/IRequestBodyNoId';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repository/UserRepository';
import { hash } from 'bcrypt';

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: IResquestBodyNoId): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);
    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
