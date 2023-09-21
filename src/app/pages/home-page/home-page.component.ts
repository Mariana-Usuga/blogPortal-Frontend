import { Component, Input } from '@angular/core';
import { article } from 'src/app/model/article.inferces';
import { comment } from 'src/app/model/comment.interface';
import { ArticleService } from 'src/app/services/article/article.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  articles: article[] = [];
  commentsVisible: boolean[] = [];
  newComment: { content: string } = { content: '' };

  constructor(
    private articleService: ArticleService,
    private commentService: CommentService,
  ) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((res: article[]) => {
      this.articles = res;
    });
  }

  toggleComments(index: number) {
    this.commentsVisible[index] = !this.commentsVisible[index];
  }

  addComment(blogId: string) {
    const content = this.newComment.content.trim();

    if (content !== '') {
      this.commentService
        .createComment(blogId, content)
        .subscribe((comment) => {
          this.newComment.content = '';
        });
    }
  }
}
