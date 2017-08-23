import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticationService {
    public token: string;
    public err: string;
    public API_HOST = 'http://localhost.dev:8888';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) {
        // set token if saved in local storage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.token = "";
    }

    login(username: string, password: string): Observable<boolean>{
        const url = this.API_HOST+"/api/authenticate/"
        return this.http.post(url, JSON.stringify({ username: username, password: password }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    // return true to indicate successful login
                    return true;
                } else {
                    return false;
                }
            })
    }

    refreshToken(): Observable<boolean> {
        return this.http.post( this.API_HOST+'/api/token-refresh/', JSON.stringify({token: this.token}), {headers: this.headers})
            .map((response: Response) => {
                // refresh successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // set new token property
                    this.token = token;
                    return true;
                } else {
                    // return false to indicate failed when refresh
                    return false;
                }
         });
    }
 
    verify(): Observable<any> {
        let headers = new Headers({'Content-Type': 'application/json'});
        let currUser = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.post(this.API_HOST+'/api/token-verify/', JSON.stringify({token: currUser.token}), {headers: headers})
            .map(
                (res: Response) => {
                    if(res.status === 400 || res.status === 401){
                        return res.json();
                    }
                    else{
                        return true;
                    }
                })
    }

    static getJWTHeader(): any{
        let user = localStorage.getItem('currentUser');
        let headers = new Headers({ 'Authorization': 'JWT ' + JSON.parse(user).token });
        let p_headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({headers: headers})
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
