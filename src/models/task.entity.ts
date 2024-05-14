import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity()
export default class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: "To_Do" })
  status!: string;

  @Column()
  title!: string;

  @Column({ default: "" })
  description!: string;

  @Column()
  tags!: string;

  @CreateDateColumn()
  date!: string;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user) => user.tasks)
  user!: User;
}
