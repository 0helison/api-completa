import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResetPasswordService from '../../../services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordEmail = container.resolve(ResetPasswordService);

    await resetPasswordEmail.execute({ password, token });

    return response.status(204).json();
  }
}
