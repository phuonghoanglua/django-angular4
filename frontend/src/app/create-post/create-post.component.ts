import { Component } from '@angular/core';
import { PostService } from '../services/post.service'
import { Router } from '@angular/router'
import {IMyDpOptions} from 'mydatepicker';


@Component({
  moduleId: module.id,
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})

export class CreatePostComponent {
    myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'yyyy-mm-dd',
    };
    post: any = {};
    error: any = {};
    loading: boolean = false;
    constructor(

        private postSerice: PostService,
        private router: Router,
    ) { }

    // ngOnInit(){
    //     console.log('ahihihi');
    // }

    createPost() {
    this.loading = true;
    console.log(typeof this.post.publish.formatted);
    this.post.publish = this.post.publish.formatted;
    this.postSerice.create(this.post)
        .subscribe(
            data => {
                console.log(data);
                this.router.navigate(['/']);
            },
            error => {
                this.error = error.json();
                this.loading = false;
                if(this.error.detail){
                    setTimeout(() => {
                    this.router.navigate(['/login'])
                }, 2000)
                }
            });
    }
}
