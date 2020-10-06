import { Repository, EntityRepository } from 'typeorm';
import Classe from '../models/Classe';

@EntityRepository(Classe)
class ClasseRepository extends Repository<Classe> {}

export default ClasseRepository;
