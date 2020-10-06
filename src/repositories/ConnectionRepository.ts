import { Repository, EntityRepository } from 'typeorm';
import Connection from '../models/Connection';

@EntityRepository(Connection)
class UserRepository extends Repository<Connection> {}

export default UserRepository;
