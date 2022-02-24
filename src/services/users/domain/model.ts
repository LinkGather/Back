import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email!: string;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    nullable: false,
  })
  password!: string;

  @Column({
    nullable: true,
    default: null,
  })
  provider?: string;

  constructor(args: {
    email: string;
    name: string;
    password: string;
    provider?: string;
  }) {
    if (args) {
      this.email = args.email;
      this.name = args.name;
      this.password = args.password;
      if (args.provider) {
        this.provider = args.provider;
      }
    }
  }
}
