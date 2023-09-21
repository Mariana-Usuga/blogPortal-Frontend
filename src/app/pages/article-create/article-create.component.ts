import { Component } from '@angular/core';
import { article } from 'src/app/model/article.inferces';
import { ArticleService } from 'src/app/services/article/article.service';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.scss'],
})
export class ArticleCreateComponent {
  isLogged = false;
  blogData: article = {
    title: '',
    content: '',
  };

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.isLogged = this.userService.isAuthenticated();
    if (!this.isLogged) {
    }
  }

  createBlog() {
    this.articleService
      .postArticle(this.blogData)
      .subscribe((response: article) => {
        if (response) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Creado con exito!!',
            showConfirmButton: false,
            timer: 2000,
          });
        }
        this.blogData = {
          title: '',
          content: '',
        };
      });
  }
}
