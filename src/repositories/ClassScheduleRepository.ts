import { Repository, EntityRepository } from 'typeorm';
import ClassSchedule from '../models/ClassSchedule';

@EntityRepository(ClassSchedule)
class ClassScheduleRepository extends Repository<ClassSchedule> {}

export default ClassScheduleRepository;
