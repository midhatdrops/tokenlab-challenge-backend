/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import * as yup from 'yup';
import { Request, Response } from 'express';
import { Encrypter } from '../utils/bcrypter';
import { UsersRepository } from '../repository/userRepository';

export class UserController {
  async create(req: Request, res: Response) {
    const schema = yup.object().shape({
      name: yup
        .string()
        .required('Campo nome não pode ser nulo')
        .min(5, 'O nome deve ter no mínimo cinco caracteres'),
      password: yup
        .string()
        .required('Campo password não pode ser nulo')
        .min(5, 'A senha deve ter no mínimo 5 caracteres'),
      email: yup
        .string()
        .required('Campo Email não pode ser nulo')
        .email('O Campo deve seguir o formato de email '),
    });
    const { name, password, email } = req.body;

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(404).json({
        error: err.errors,
      });
    }

    const usersRepository = getCustomRepository(UsersRepository);
    const alreadyExists = await usersRepository.findOne({ email });
    if (alreadyExists) {
      throw new Error('Already exists');
    }
    const cryptPassword = await Encrypter.execute(password);
    const newUser = usersRepository.create({
      name,
      email,
      password: cryptPassword,
    });

    await usersRepository.save(newUser);
    const User = await usersRepository.findOne({ email });
    return res.status(201).json(User);
  }

  async findAll(req: Request, res: Response) {
    const usersRepository = getCustomRepository(UsersRepository);
    const users = await usersRepository.find();
    return res.status(200).json(users);
  }

  async findByEmail(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ email });
    if (!user) {
      throw new Error('User not found!');
    }
    return user;
  }
}
