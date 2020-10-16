import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/services/moment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  momentData = [];
  metaData = {};
  constructor(
    public momentService: MomentService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllMoment();
  }

  getAllMoment() {
    this.momentService.getMomentList().subscribe(
      (result) => {
        if (result && result.status === 200) {
          this.momentData = result.response;
        } else {
          this.toastr.info('', result.message, toasterConfig);
        }
      },
      (error) => {}
    );
  }

  editMoment(id) {
    this.router.navigate(['edit-moment', id]);
  }
  deleteMoment(id) {
    this.momentService.deleteMomentService(id).subscribe(
      (result) => {
        if (result && result.status === 200) {
          this.toastr.info('', result.message, toasterConfig);
          this.momentData = result.response;
          this.getAllMoment();
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
