import { user } from './user.interface';

export interface comment {
  content: string | null;
  creationDate: string | null;
  authorId: user;
}
