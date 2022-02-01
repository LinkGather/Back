import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => User, (users) => users.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: number | User;

  @ManyToOne((type) => Post, (posts) => posts.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post: number | Post;
}
