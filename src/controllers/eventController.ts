/* eslint-disable class-methods-use-this */
import * as yup from 'yup';
import { getCustomRepository, Between } from 'typeorm';
import { Response, Request } from 'express';
import { addDays } from 'date-fns';
import { EventRepository } from '../repository/eventsRepository';
import { JWTDecoder } from '../utils/jwtDecoder';
import { extractToken } from '../utils/ExtractToken';

export class EventController {
  async create(req: Request, res: Response) {
    console.log('Reciving request');
    const eventRepository = getCustomRepository(EventRepository);
    const schema = yup.object().shape({
      description: yup.string().required().min(5),
      initTime: yup.date().required(),
      finishTime: yup.date().required(),
      month: yup.number().required(),
    });
    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      return res.status(404).json({ errors: err.errors });
    }
    const { description, initTime, finishTime, month } = req.body;
    const eventAlreadyExists = await eventRepository.findOne({ description });
    if (eventAlreadyExists) {
      throw new Error('Event Already Exists!');
    }
    const token = extractToken(req);
    const user = await JWTDecoder.getUserByToken(token);
    const newEvent = eventRepository.create({
      description,
      initTime,
      finishTime,
      user,
      month,
    });

    await eventRepository.save(newEvent);
    const Event = await eventRepository.findOne({ description });
    return res.status(201).json(Event);
  }

  async findAll(res: Response) {
    const eventRepository = getCustomRepository(EventRepository);
    const events = await eventRepository.find();
    res.status(200).json(events);
  }

  async findOne(req: Request, res: Response) {
    const eventRepository = getCustomRepository(EventRepository);
    const id = Number(req.params.id);
    const event = await eventRepository.findOne({ id });
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    return res.status(200).json(event);
  }

  async findByMonth(req: Request, res: Response) {
    const eventRepository = getCustomRepository(EventRepository);
    const testDate = new Date(`2021-04-01 00:00:00`);
    const AddedDays = (date: Date) => Between(date, addDays(date, 30));

    const events = await eventRepository.find({
      where: {
        initTime: AddedDays(testDate),
      },
    });
    if (!events) {
      return res.status(200).json({});
    }
    return res.status(200).json(events);
  }

  async findByUser(req: Request, res: Response) {
    const month = Number(req.params.month);
    const eventRepository = getCustomRepository(EventRepository);
    const token = extractToken(req);
    const user = await JWTDecoder.getUserByToken(token);
    const events = await eventRepository.find({
      where: {
        month,
        user,
      },
    });
    if (!events) return res.status(404).json({ message: 'not found' });
    return res.status(200).json(events);
  }

  async update(req: Request, res: Response) {
    const { description, initTime, finishTime, month } = req.body;
    const eventRepository = getCustomRepository(EventRepository);
    const id = Number(req.params.id);
    if (!description || !initTime || !finishTime || !month) {
      return res.status(403).json({ message: 'Cannot send empty fields' });
    }
    await eventRepository.update(id, {
      description,
      initTime,
      finishTime,
      month,
    });
    const event = await eventRepository.findOne({ id });
    return res.status(200).json(event);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const eventRepository = getCustomRepository(EventRepository);
    const event = await eventRepository.findOne({ id });
    if (!event) {
      return res.status(404).json({ message: `event not found` });
    }
    await eventRepository.delete(id);
    return res.status(200).json({ message: `event id ${id} was deleted` });
  }
}
