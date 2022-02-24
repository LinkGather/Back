import { stripUndefined } from '../../../lib/common';
import * as moment from 'moment';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';

type PostUpdateType = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  likeNum?: number;
};
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

  @Column({})
  likeNum?: number;

  @Column()
  userId!: number;

  constructor(args: {
    title: string;
    description: string;
    image: string;
    url: string;
    userId: number;
  }) {
    if (args) {
      this.title = args.title;
      this.description = args.description;
      this.image = args.image;
      this.url = args.url;
      this.uploadTime = moment().format('YYYY-MM-DD');
      this.likeNum = 0;
      this.likes = [];
      this.dibs = [];
      this.userId = args.userId;
    }
  }

  @OneToMany((type) => Like, (likes) => likes.post, {
    nullable: false,
    cascade: true,
  })
  likes!: Like[];

  @OneToMany((type) => Dib, (dibs) => dibs.post, {
    nullable: false,
    cascade: true,
  })
  dibs!: Dib[];

  public addLikes(userId: number) {
    const like = new Like(userId);
    this.likes.push(like);
  }

  public addDibs(userId: number) {
    const dib = new Dib(userId);
    this.dibs.push(dib);
  }

  public update(args: PostUpdateType) {
    const strippedArgs = stripUndefined(args);
    Object.assign(this, strippedArgs);
  }
}

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  @ManyToOne((type) => Post, (posts) => posts.likes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post!: never;
}

@Entity('dibs')
export class Dib {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  @ManyToOne((type) => Post, (posts) => posts.dibs, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  post!: never;
}
