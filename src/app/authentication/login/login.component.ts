import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthenticationService } from '../service/authentication.service';
import { JarwisService } from '../service/jarwis.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  isLoadingOne: boolean = false;
  constructor(private formBuilder: FormBuilder,
              private jarwis: JarwisService,
              private auth: AuthenticationService,
              private notification: NzNotificationService,
              private token: TokenService,
              private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.alreadyLoggedIn()
  }

  onSubmit(){
    this.isLoadingOne = true
    this.jarwis.login(this.loginForm.value).subscribe(
      
      data => this.handleResponse(data),
      error => this.handleError(error),
      );
  }

  handleResponse(data: any){
    this.isLoadingOne = false
    if (data.error === 'Invalid username or password'){
      this.notification.error('Login', data.error);
    }else {
    const username = this.loginForm.value.username;
    sessionStorage.setItem('username', this.loginForm.value.username);
    this.token.handle(data.value);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('app/dashboard').then(() => {window.location.reload();});
    }
  }
  handleError(error: any){
    this.isLoadingOne = false
    error = this.notification.error( 'Login', error.error.Error );
  }

  alreadyLoggedIn(){
    if (this.auth.isLoggedIn) {
      this.notification.error("Login", "You are already Logged in")
      this.router.navigate(['app/dashboard']);
   }
  }
}





