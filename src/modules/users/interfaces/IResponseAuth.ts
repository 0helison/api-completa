import User from '../typeorm/entities/User';

export default interface IResponseAuth {
  user: User;
  token: string;
}
