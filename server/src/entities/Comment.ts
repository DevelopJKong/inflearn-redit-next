import { Vote } from './Vote';
import { User } from './User';
import { BeforeInsert, Column, Index, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import BaseEntity from './Entity';
import { Post } from './Post';
import { Exclude, Expose } from 'class-transformer';
import { makeId } from '../utils/helpers';

export class Comment extends BaseEntity {
  @Index()
  @Column()
  identifier: string;

  @Column()
  body: string;

  @Column()
  postId: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'username', referencedColumnName: 'username' })
  user: User;

  @ManyToOne((type) => Post, (post) => post.comments, { nullable: false })
  post: Post;

  @Exclude()
  @OneToMany((type) => Vote, (vote) => vote.comment)
  votes: Vote[];

  protected userVote: number;

  setUserVote(user: User) {
    const index = this.votes?.findIndex((v) => v.username === user.username);
    this.userVote = index > -1 ? this.votes[index].value : 0;
  }

  @Expose() get voteScore(): number {
    const initialValue = 0;
    return this.votes?.reduce(
      (previousValue, currentValue) => previousValue + (currentValue.value || 0),
      initialValue,
    );
  }

  @BeforeInsert()
  makeId() {
    this.identifier = makeId(8);
  }
}
