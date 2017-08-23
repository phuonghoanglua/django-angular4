import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from './index';
import { User } from '../models/models.component';
import 'rxjs/add/operator/map'


@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private router: Router,
        private authenticationService: AuthenticationService) {
    }

    getUsers(): Observable<any> {
        let options = AuthenticationService.getJWTHeader();
        // get users from api
        return this.http.get(this.authenticationService.API_HOST+'/api/users/', options)
            .map((response: Response) => response.json());
    }

    create(user: User): Observable<any>{
        // let options = this.authenticationService.getJWTHeader()
        // get users from api
        return this.http.post(this.authenticationService.API_HOST+'/api/users/', user)
            .map((response: Response) => response.json());
    }

}
