import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ObjectIdColumn,
} from 'typeorm';

@Entity('book')
export class Book extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  year: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
