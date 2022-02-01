import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dib } from './dib.entity';
import { Like } from './like.entity';
import { Post } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  provider: string;

  @OneToMany((type) => Post, (posts) => posts.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @OneToMany((type) => Like, (likes) => likes.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany((type) => Dib, (dibs) => dibs.user, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  dibs: Dib[];
}
