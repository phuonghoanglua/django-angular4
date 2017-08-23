import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from "../models/models.component";
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  moduleId: module.id,
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})


export class PostsComponent implements OnInit {
    id: number;
    error: String;
    post: Post;
    private sub: any;

  constructor(
      private router: ActivatedRoute,
      private route: Router,
      private postService: PostService
  ) { }

  ngOnInit() {
      this.sub = this.router.params.subscribe(params => {
          this.id = +params['id'];
          this.postService.getPostDetail(this.id.toString()).subscribe(
              posts => { this.post = posts.results },
              error => {
                  console.log(error.json());
                  this.error = error.detail;
                  setTimeout(() =>{
                      this.route.navigate(['/login']).then()
                  }, 2000)

            }
        )
    });
  }
}
