import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
} from 'typeorm';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import { hash } from 'bcrypt';
import { IsEmail } from 'class-validator';

@Entity()
export class Users extends BaseEntity {
  @Expose({ name: 'userId', toPlainOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ length: '30', nullable: true })
  firstName: string;

  @Column({ length: '30', nullable: true })
  lastName: string;

  toJSON() {
    return classToPlain(this);
  }

  @BeforeInsert()
  async hashPassword(): Promise<string> {
    if (this.password) {
      return (this.password = await hash(this.password, 10));
    }
  }
}
