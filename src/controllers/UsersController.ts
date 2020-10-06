import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';

class UserController {
  async create(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const {
      name,
      whatsapp,
      bio,
      avatar,
    } = request.body;

    const existUser = await userRepository.findOne({ name });

    if (existUser) {
      return response.status(400).json({ message: 'User already exists!' });
    }

    const user = userRepository.create({
      name,
      whatsapp,
      bio,
      avatar,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }

  async index(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    response.json(await userRepository.find());
  }

  async delete(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const { id } = request.params;

    const userFound = await userRepository.findOne(id);

    if (!userFound) {
      return response.status(400).json({ error: 'Repository does not exist' });
    }
    await userRepository.delete(userFound);

    return response.status(204).send();
  }

  async update(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);

    const { id } = request.params;
    const {
      name,
      whatsapp,
      bio,
      avatar,
    } = request.body;

    const userFound = await userRepository.findOne(id);

    if (!userFound) {
      return response.status(400).json({ error: 'Repository does not exists.' });
    }

    userRepository.merge(userFound, {
      id,
      name,
      whatsapp,
      bio,
      avatar,
    });

    return response.json();
  }
}

export default new UserController();
