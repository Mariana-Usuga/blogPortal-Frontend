import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment/comment.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent {
  blogId: any;
  blogDetails: any;
  commentsVisible: boolean[] = [];
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService,
    private userService: UserService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.commentForm = this.formBuilder.group({
      content: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.blogId = params['id'];
      this.articleService.getArticleById(this.blogId).subscribe((data) => {
        this.blogDetails = data;
        //data.comments.reverse();
        this.blogDetails.comments = data.comments;
        console.log('data ', data)
      });
    });
  }

  submitComment() {
    if(this.userService.isAuthenticated()){
      if (this.commentForm.valid) {
        const commentContent = this.commentForm.value.content;
        this.commentService.createComment(this.blogId, commentContent).subscribe((response) => {
          this.blogDetails = {...this.blogDetails, comments: [response, ...this.blogDetails.comments]}
          this.commentForm.reset();
        });
      }
    } else {
      this.router.navigate(['/login']); 
    }
    
  }
}
