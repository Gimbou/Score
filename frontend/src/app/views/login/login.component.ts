import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const url = this.router.url;

    this.apiService.confirmSignIn(url);
  }
}
