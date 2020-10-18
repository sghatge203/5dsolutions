import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/services/moment.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
import { faEdit,faSpinner,faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  momentData = [];
  metaData = {};
  faEdit=faEdit
  faTrash=faTrash
  faSpinner = faSpinner
  loader = false
  constructor(
    public momentService: MomentService,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.getAllMoment();
  }
  

  ngOnInit(): void {
  
  }

  getAllMoment() {
    this.loader = true
    this.momentService.getMomentList().subscribe(
      (result) => {
        this.loader = false
        if (result && result.status === 200) {
          this.momentData = result.response;
        } else {
          this.toastr.info('', result.message, toasterConfig);
        }
      },
      (error) => {
        this.loader = false
      }
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
