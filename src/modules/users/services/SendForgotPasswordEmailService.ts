import { getCustomRepository } from 'typeorm';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IRequestEmail from '../interfaces/IRequestEmail';
import UserTokensRepository from '../typeorm/repository/UserTokensRepository';
import UserRepository from '../typeorm/repository/UserRepository';
import Etherealmail from '@config/mail/EtherealMail';

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequestEmail): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await Etherealmail.sendMail({
      to: {
        name: user.email,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
