import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userData = {};
  loader= false
  faSpinner=faSpinner
  constructor(
    public authService: AuthService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit = (f: NgForm) => {
    this.loader =true
    this.authService.registerService(f.value).subscribe(
      (result) => {
        this.loader =false
        if (result && result.status === 200) {
          this.router.navigate(['/']);
          this.toastr.info('', result.message, toasterConfig);
        } else {
          this.toastr.error('', result.message, toasterConfig);
        }
      },
      (error) => {
        this.loader =false
        this.toastr.error('', 'Service Failed', toasterConfig);
      }
    );
  };
}
