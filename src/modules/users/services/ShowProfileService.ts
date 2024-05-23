import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repository/UserRepository';
import IRequestId from '../interfaces/IRequestId';
import AppError from '@shared/errors/AppError';

class ShowProfileService {
  public async execute({ user_id }: IRequestId): Promise<User> {
    const usersRepository = getCustomRepository(UserRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ShowProfileService;
