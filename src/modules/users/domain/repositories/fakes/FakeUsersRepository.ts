import { v4 as uuidv4 } from 'uuid';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import User from '@modules/users/infra/typeorm/entities/User';
import { IUsersRepository, SearchParams } from '../IUserRepository';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find(user => user.email === email);
    return user || null;
  }

  public async create({ name, email, password }: ICreateUser): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuidv4(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findByName(name: string): Promise<User | null> {
    const user = this.users.find(user => user.name === name);
    return user || null;
  }

  public async findById(id: string): Promise<User | null> {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<IPaginateUser> {
    const data = this.users.slice(skip, skip + take);
    const total = this.users.length;

    return {
      per_page: take,
      total,
      current_page: page,
      data,
    };
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;

    return user;
  }

  public async remove(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users.splice(findIndex, 1);
  }
}

export default FakeUsersRepository;
