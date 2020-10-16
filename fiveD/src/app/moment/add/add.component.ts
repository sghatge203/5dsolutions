import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
import { MomentService } from 'src/services/moment.service';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  constructor(
    public momentService: MomentService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}
  onSubmit = (f: NgForm) => {
    this.momentService.createMomentService(f.value).subscribe(
      (result) => {
        if (result && result.status === 200) {
          this.router.navigate(['/list-moment']);
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
