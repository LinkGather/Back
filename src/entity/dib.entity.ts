import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('dibs')
export class Dib {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (users) => users.dibs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: number | User;

  @ManyToOne((type) => Post, (posts) => posts.dibs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: number | Post;
}
