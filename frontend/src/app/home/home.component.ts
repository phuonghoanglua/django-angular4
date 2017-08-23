﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/models.component';
import { PostService } from '../services/post.service';
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/operator/catch';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    posts: Post[] = [];
    error: String = null;
    constructor(private postService: PostService,
        private authService: AuthenticationService,
        private router: Router) { }

    ngOnInit() {
        // get users from secure api end point
        this.authService.verify().subscribe(
            res => {
                console.log(res);
                this.postService.getPosts().subscribe(
                    posts => { this.posts = posts.results }
                )
            },
            err => {
                this.error = err.json().non_field_errors;
                setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000)
            }
        )}

}
