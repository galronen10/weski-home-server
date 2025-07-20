import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  totalScore: number;

  @Column()
  name: string;

  @Column()
  image: string;
}
