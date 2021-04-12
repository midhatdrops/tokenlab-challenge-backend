import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './User';

@Entity('Event')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column({ unique: true })
  initTime: Date;

  @Column()
  month: number;

  @Column()
  finishTime: Date;

  @ManyToOne(() => User, (user) => user.events)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
