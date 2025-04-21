import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {

  
  }

  login(username: string, password: string){
    this.authService.login(username, password).subscribe({
      next: (res) => {
        if(res.token){
          console.log(res.token)
          localStorage.setItem('token', res.token)
          this.authService.setAuth(true)
          this.router.navigate(['/home'])
        }
      },
      error: (err) => {
        console.log('Login service error', err)
        
      }
    })
  }
}
