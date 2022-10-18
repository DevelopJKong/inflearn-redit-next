import { ManyToOne } from 'typeorm';
import BaseEntity from './Entity';
import { Post } from './Post';
import { User } from './User';

export class Vote extends BaseEntity {
  @ManyToOne((type) => Post, (post) => post.votes)
  post: Post;

  @ManyToOne((type) => User, (user) => user.votes)
  user: User;
}
