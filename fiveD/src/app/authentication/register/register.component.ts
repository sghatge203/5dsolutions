import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userData = {};
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit = (f: NgForm) => {
    this.authService.registerService(f.value).subscribe(
      (result) => {
        if (result && result.status === 200) {
          this.router.navigate(['/']);
          this.toastr.info('', result.message, toasterConfig);
        } else {
          this.toastr.info('', result.message, toasterConfig);
        }
      },
      (error) => {
        this.toastr.info('', 'Service Failed', toasterConfig);
      }
    );
  };
}
