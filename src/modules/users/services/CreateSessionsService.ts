import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UserRepository from '../typeorm/repository/UserRepository';
import { compare } from 'bcrypt';
import { IResquestAuth } from '../interfaces/IRequestAuth';
import IResponseAuth from '../interfaces/IResponseAuth';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IResquestAuth): Promise<IResponseAuth> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSessionsService;
