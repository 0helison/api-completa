import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import IRequestTokenAndPassword from '../interfaces/IRequestTokenAndPassword';
import UserRepository from '../infra/typeorm/repository/UserRepository';
import UserTokensRepository from '../infra/typeorm/repository/UserTokensRepository';
import { hash } from 'bcrypt';

class ResetPasswordService {
  public async execute({
    token,
    password,
  }: IRequestTokenAndPassword): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const userToken = await userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists.');
    }

    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }

    user.password = await hash(password, 8);

    await usersRepository.save(user);
  }
}

export default ResetPasswordService;
