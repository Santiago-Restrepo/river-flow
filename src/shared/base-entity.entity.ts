import { PrimaryGeneratedColumn } from 'typeorm';
import TimeStampsEntity from './time-stamps.entity';

export default abstract class BaseEntity extends TimeStampsEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
