import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { CommonModule } from '@angular/common';
import { User } from '../core/auth/models/auth.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  isAuth: boolean = false
  user: User | null = null
  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.authService.isAuth$.subscribe({
        next: (isAuth) => {
          this.isAuth = isAuth
        }
      })
      this.authService.user$.subscribe({
        next: (user => {
          this.user = user
        }) 
      })
  }
}
