/* eslint-disable class-methods-use-this */
import { getCustomRepository } from 'typeorm';
import { Response, Request } from 'express';
import { EventRepository } from '../repository/eventsRepository';

export class EventController {
  async create(req: Request, res: Response) {
    const { description, initTime, finishTime, user } = req.body;
    const eventRepository = getCustomRepository(EventRepository);
    const eventAlreadyExists = await eventRepository.findOne({ description });
    if (eventAlreadyExists) {
      throw new Error('Event Already Exists!');
    }
    const newEvent = eventRepository.create({
      description,
      initTime,
      finishTime,
      user,
    });

    await eventRepository.save(newEvent);
    const Event = eventRepository.findOne({ description });
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

  async update(req: Request, res: Response) {
    const { description, initTime, finishTime } = req.body;
    const eventRepository = getCustomRepository(EventRepository);
    const id = Number(req.params.id);
    if (!description || !initTime || !finishTime) {
      return res.status(403).json({ message: 'Cannot send empty fields' });
    }
    await eventRepository.update(id, { description, initTime, finishTime });
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
