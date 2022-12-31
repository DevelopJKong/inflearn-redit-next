import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import BaseEntity from './Entity';
import { Post } from './Post';
import { User } from './User';
import { Comment } from './Comment';

@Entity('votes')
export class Vote extends BaseEntity {
   @Column('int')
   value: number;

   @Column('varchar')
   username: string;

   @Column('int', { nullable: true })
   postId: number;

   @ManyToOne((_type) => Post, (post) => post.votes)
   post: Post;

   @ManyToOne((_type) => User, (user) => user.votes)
   @JoinColumn({ name: 'username', referencedColumnName: 'username' })
   user: User;

   @Column('int', { nullable: true })
   commentId: number;

   @ManyToOne((_type) => Comment)
   comment: Comment;
}
