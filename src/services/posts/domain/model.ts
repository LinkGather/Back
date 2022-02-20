import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { User } from '../../users/domain/model';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ fulltext: true })
  @Column({
    nullable: false,
    type: 'varchar',
  })
  title!: string;

  @Index({ fulltext: true })
  @Column({
    nullable: false,
    type: 'text',
  })
  description!: string;

  @Column({
    nullable: false,
  })
  image!: string;

  @Column({
    nullable: false,
  })
  url!: string;

  @Column({
    nullable: false,
  })
  uploadTime!: string;

  @Column({
    nullable: true,
    default: 0,
  })
  likeNum!: number;

  @ManyToOne((type) => User, (users) => users.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: number | User;

  @OneToMany((type) => Like, (likes) => likes.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  likes!: Like[];

  @OneToMany((type) => Dib, (dibs) => dibs.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  dibs!: Dib[];
}

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => User, (users) => users.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: number | User;

  @ManyToOne((type) => Post, (posts) => posts.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post!: number | Post;
}

@Entity('dibs')
export class Dib {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne((type) => User, (users) => users.dibs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user!: number | User;

  @ManyToOne((type) => Post, (posts) => posts.dibs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post!: number | Post;
}
