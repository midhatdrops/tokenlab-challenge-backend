import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Event } from './Event';

@Entity('User')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Event, (event) => event.user)
  events: Event[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
