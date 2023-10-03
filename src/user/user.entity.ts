import { Entity, BaseEntity, PrimaryGeneratedColumn,ObjectIdColumn, Column } from 'typeorm';

export enum TType {
  a = 'pelajar',
  b = 'pekerja',
  c = 'pengangguran',
}

@Entity()
export class UserEntity extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  nama: string;

  @Column()
  email: string;

  @Column()
  umur: number;

  @Column()
  tanggal_lahir: string;

  @Column({ type: 'enum', enum: TType, default: TType.a })
  status: TType;
}
