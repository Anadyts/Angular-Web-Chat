import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/auth.model';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStore = new BehaviorSubject<User | null >(null)
  user$ = this.userStore.asObservable()
  private isAuthStore = new BehaviorSubject(false)
  isAuth$ = this.isAuthStore.asObservable() 
  private apiUrl = 'http://localhost:3000/api/'
  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('token')
    if(token){
      http.get<{user: User}>(this.apiUrl + `me?token=${token}`).pipe(
        tap(res => {
          this.userStore.next(res.user)
          this.isAuthStore.next(true)
        }),
        catchError((err) => {
          this.logout()
          return of(null)
        })
      ).subscribe()
    }else{
      this.isAuthStore.next(false)
    }
  }

  login(username: string, password: string){
    return this.http.post<{token: string}>(this.apiUrl + 'login', {username, password})
  }

  setUser(user: User){
    this.userStore.next(user)
  }

  setAuth(status: boolean){
    this.isAuthStore.next(status)
  }

  logout(){
    this.userStore.next(null)
    this.isAuthStore.next(false)
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
