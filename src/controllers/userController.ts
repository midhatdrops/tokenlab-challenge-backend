/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import { UsersRepository } from '../repository/userRepository';

export class UserController {
  async create(name: string, email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const alreadyExists = await usersRepository.findOne({ email });
    if (alreadyExists) {
      throw new Error('Already exists');
    }
    const newUser = usersRepository.create({
      name,
      email,
      password,
    });
    await usersRepository.save(newUser);
    const User = await usersRepository.findOne({ email });
    return User;
  }

  async findAll(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return res.status(200).json(users);
  }
}
