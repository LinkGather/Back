import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { Dib } from './dib.entity';
import { Like } from './like.entity';
import { User } from './user.entity';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column({
    nullable: false,
    type: 'varchar',
  })
  title: string;

  @Index({ fulltext: true })
  @Column({
    nullable: false,
    type: 'text',
  })
  description: string;

  @Column({
    nullable: false,
  })
  image: string;

  @Column({
    nullable: false,
  })
  url: string;

  @Column({
    nullable: false,
  })
  uploadTime: string;

  @Column({
    nullable: true,
    default: 0,
  })
  likeNum: number;

  @ManyToOne((type) => User, (users) => users.posts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: number | User;

  @OneToMany((type) => Like, (likes) => likes.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  likes: Like[];

  @OneToMany((type) => Dib, (dibs) => dibs.post, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  dibs: Dib[];
}
