import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userData = {};
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // Login request to api
  onSubmit = (f: NgForm) => {
    this.authService.loginService(f.value).subscribe((result) => {
      if (result && result.status === 200) {
        localStorage.setItem('AUTH_TOKEN', result.response.accessToken);
        localStorage.setItem('AUTH_EMAIL', result.response.email);
        this.router.navigate(['/list-moment']);
      } else {
        this.toastr.info('', result.message, toasterConfig);
      }
      (error) => {
        this.toastr.info('', 'Service Failed', toasterConfig);
      };
    });
  };
}
