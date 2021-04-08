import { EntityRepository, Repository } from 'typeorm';
import { User } from '../database/models/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {}
