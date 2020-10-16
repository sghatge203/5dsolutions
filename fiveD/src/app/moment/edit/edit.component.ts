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
  base64;
  fileInput;
  showError = false
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
  getImage(event) {
    this.fileInput = event.target.files[0];
    if(!this.checkValidImage(this.fileInput)){
    this.getBase64(this.fileInput);
    }
  }
  checkValidImage(fileInput) {
    console.log('fileInput', fileInput);
    if (fileInput.type.includes('image')) {
      this.showError = false;
    } else {
      this.showError = true;
    }
    return this.showError;
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
    const formData: FormData = new FormData();
    formData.append('data',JSON.stringify(f.value));
    formData.append('image', this.fileInput, this.fileInput.name);
    this.momentService.uppdateMomentService(formData).subscribe(
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
  getBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.base64 = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }
}
