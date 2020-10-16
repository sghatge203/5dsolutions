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
  fileInput;
  showError = false;
  base64: any;
  constructor(
    public momentService: MomentService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  getImage(event) {
    this.fileInput = event.target.files[0];
    if (!this.checkValidImage(this.fileInput)) {
      this.getBase64(this.fileInput);
    }
  }
  checkValidImage(fileInput) {
    if (fileInput.type.includes('image')) {
      this.showError = false;
    } else {
      this.showError = true;
    }
    return this.showError;
  }

  onSubmit = (f: NgForm) => {
    const formData: FormData = new FormData();
    formData.append('data', JSON.stringify(f.value));
    formData.append('image', this.fileInput, this.fileInput.name);
    this.momentService.createMomentService(formData).subscribe(
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
