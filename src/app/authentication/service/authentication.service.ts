import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  constructor(private http: HttpClient,
              private token: TokenService) { }


  changeAuthStatus(value : boolean) {
    this.loggedIn.next(value);
  }

  getUserByUsername(username: any){
    return this.http.get(`${environment.centralAdmin}/getUserByUsername/${username}`, {headers:{
      Authorization: `Bearer ${sessionStorage.token}`
    }});
  }
  get isLoggedIn(): boolean {
    let authToken = sessionStorage.getItem('token');
    authToken = sessionStorage.getItem('username')
    sessionStorage.getItem('email');
    return (authToken !== null) ? true : false;
  }
}
