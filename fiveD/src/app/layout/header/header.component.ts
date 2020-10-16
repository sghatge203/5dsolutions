import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName;
  constructor(public router: Router) {
    this.userName = localStorage.getItem('AUTH_EMAIL');
  }

  ngOnInit(): void {}
  logoutSession() {
    this.router.navigate([''])
    localStorage.clear();
  }
}
