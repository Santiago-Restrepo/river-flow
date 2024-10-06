import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export default class TimeStampsEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
