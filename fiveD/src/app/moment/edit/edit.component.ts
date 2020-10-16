import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MomentService } from 'src/services/moment.service';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  metaData = {};
  id;
  constructor(
    public activatedRouter: ActivatedRoute,
    public momentService: MomentService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.id = activatedRouter.params['_value'].id;
  }

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.momentService.ediMomentService(this.id).subscribe(
      (result) => {
        if (result && result.status === 200) {
          this.metaData = result.response;
          this.toastr.info('', result.message, toasterConfig);
        } else {
          this.toastr.info('', result.message, toasterConfig);
        }
      },
      (error) => {
        this.toastr.info('', 'Service Failed', toasterConfig);
      }
    );
  }
  onSubmit(f: NgForm) {
    this.momentService.uppdateMomentService(f.value).subscribe(
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
  }
}
