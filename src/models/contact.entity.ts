import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from "typeorm";
import User from "./user.entity";

@Entity()
export default class Contact extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ default: "" })
  email?: string;

  @Column()
  phone?: string;

  @Column({ name: "user_id" })
  userId!: number;

  @ManyToOne(() => User, (user: any) => user.tasks)
  user!: User;
}
