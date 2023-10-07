import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ObjectIdColumn,
  Column,
} from 'typeorm';

export enum MerekMobil {
  honda = 'honda',
  toyota = 'toyota',
  suzuki = 'suzuki',
}

@Entity('mobil')
export class MobilEntity extends BaseEntity {
  @ObjectIdColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ type: 'enum', enum: MerekMobil, default: MerekMobil.honda })
  merek_mobil: MerekMobil;

  @Column()
  tipe_mobil: string;

  @Column()
  harga: number;

  @Column()
  tahun: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
