import { comment } from './comment.interface';
import { user } from './user.interface';

export interface article {
  _id?: string;
  content: string | null;
  title: string | null;
  comments?: comment[];
  authorId?: user;
}
