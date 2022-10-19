import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './Entity';
import { Post } from './Post';
import { User } from './User';

@Entity('votes')
export class Vote extends BaseEntity {
  @Column()
  value: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  postId: number;

  @ManyToOne((type) => Post, (post) => post.votes)
  post: Post;

  @ManyToOne((type) => User, (user) => user.votes)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @Column({ nullable: true })
  commentId: number;

  @ManyToOne((type) => Comment)
  comment: Comment;
}
