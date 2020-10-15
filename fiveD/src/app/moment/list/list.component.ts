import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/services/moment.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public momentService: MomentService) {}

  ngOnInit(): void {}
  editMoment(id) {}
  deleteMoment(id) {
    this.momentService.deleteMomentService(id).subscribe(
      (result) => {
        if (result && result.status === 200) {
        } else {
        }
      },
      (error) => {}
    );
  }

  submitUpdate(id, body) {
    this.momentService.uppdateMomentService(id, body).subscribe(
      (result) => {
        if (result && result.status === 200) {
        } else {
        }
      },
      (error) => {}
    );
  }

  createNewMoment(body) {
    this.momentService.createMomentService(body).subscribe(
      (result) => {
        if (result && result.status === 200) {
        } else {
        }
      },
      (error) => {}
    );
  }
}
