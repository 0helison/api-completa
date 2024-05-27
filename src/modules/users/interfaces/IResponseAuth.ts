import User from '../infra/typeorm/entities/User';

export default interface IResponseAuth {
  user: User;
  token: string;
}
