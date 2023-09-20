import { Component, Input } from '@angular/core';
import { article } from 'src/app/model/article.inferces';
import { comment } from 'src/app/model/comment.interface';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment/comment.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  //@Input() blogs: article[]; // Supongamos que tienes una variable "blogs" en tu componente

  articles: article[] = [];
  commentsVisible: boolean[] = [];
  newComment: { content: string } = { content: '' };
  //comments: comment[] = [];

  constructor(private articleService: ArticleService, private commentService: CommentService) {}

  ngOnInit() {
    this.articleService.getArticles().subscribe((res: article[]) => {
      console.log('res ', res)
      this.articles = res;
    });
  }

  toggleComments(index: number) {
    this.commentsVisible[index] = !this.commentsVisible[index];
  }

  addComment(blogId: any) {
    const content = this.newComment.content.trim();

    if (content !== '') {
      this.commentService.createComment(blogId, content).subscribe((comment) => {
        console.log('comment ', comment)
        this.newComment.content = '';
      });
    }
  }
}
