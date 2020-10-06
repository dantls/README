import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne, OneToMany,
} from 'typeorm';
import Classe from './Classe';

@Entity('class_schedule')
class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  week_day: string;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  class_id: string;

  @ManyToOne(() => Classe, (classe) => classe.class_schedules, { eager: true })
  @JoinColumn({ name: 'class_id' })
  classe: Classe;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default ClassSchedule;
