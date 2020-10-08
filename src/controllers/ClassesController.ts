import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';

import ClasseRepository from '../repositories/ClasseRepository';
import convertHourToMinutes from '../utils/convertHoursToMinutes';
import UserRepository from '../repositories/UserRepository';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

class ClasseController {
  async create(request: Request, response: Response) {
    const classeRepository = getCustomRepository(ClasseRepository);
    const userRepository = getCustomRepository(UserRepository);

    const {
      user_id,
      subject,
      cost,
      schedule,
    } = request.body;

    const existUser = await userRepository.find({ id: user_id });

    if (!existUser) {
      return response.status(400).json({ message: "User doesn't exists!" });
    }

    const class_schedules = schedule.map((scheduleItem: ScheduleItem) => ({
      week_day: scheduleItem.week_day,
      from: convertHourToMinutes(scheduleItem.from),
      to: convertHourToMinutes(scheduleItem.to),
    }));

    const classe = classeRepository.create({
      user_id,
      subject,
      cost,
      class_schedules,
    });
    await classeRepository.save(classe);

    return response.status(201).json(classe);
  }

  async index(request: Request, response: Response) {
    const classeRepository = getCustomRepository(ClasseRepository);

    const filters = request.query;
    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time = filters.time as string;

    const timeInMinutes = convertHourToMinutes(time);

    const classe = await classeRepository
      .createQueryBuilder('classes')
      // .select([
      //   'classes.id',
      //   'classes.subject',
      //   'classes.cost',
      // ])
      .leftJoinAndSelect('classes.class_schedules', 'class_schedules')
      .leftJoinAndSelect('classes.user', 'users')
      .where('classes.subject = :subject', { subject })
      .andWhere('class_schedules.week_day = :week_day', { week_day })
      .andWhere('class_schedules.from <= :timeInMinutes', { timeInMinutes })
      .andWhere('class_schedules.to > :timeInMinutes', { timeInMinutes })
      .getMany();
      // .getSql();
      // .printSql()

    return response.json(classe);
  }
}

export default new ClasseController();
