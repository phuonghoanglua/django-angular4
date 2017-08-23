/**
 * Created by cherry on 8/19/17.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './index';
import { Post } from '../models/models.component';
import 'rxjs/add/operator/map'


@Injectable()
export class PostService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getPosts(): Observable<any> {
        let options = AuthenticationService.getJWTHeader();
        // get post from api
        return this.http.get(this.authenticationService.API_HOST+'/api/posts/', options)
            .map((response: Response) => response.json());
    }

    getPostDetail(id: String): Observable<any>{
        let options = AuthenticationService.getJWTHeader();
        // get detail from api
        return this.http.get(this.authenticationService.API_HOST+'/api/posts/' + id+'/', options)
            .map((response: Response) => response.json());
    }

    // create new post
    create(post: Post): Observable<any>{
        let options = AuthenticationService.getJWTHeader();
        return this.http.post(this.authenticationService.API_HOST+'/api/posts/', post, options)
            .map((response: Response) => response.json());
    }

    // update api
    update(post: Post, id: String): Observable<any>{
        let options = AuthenticationService.getJWTHeader();
        return this.http.put(this.authenticationService.API_HOST+'/api/posts/'+id+'/', post, options)
            .map((response: Response) => response.json());
    }

}

