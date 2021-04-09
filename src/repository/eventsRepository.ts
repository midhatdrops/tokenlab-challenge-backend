import { EntityRepository, Repository } from 'typeorm';
import { Event } from '../database/models/Event';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {}
