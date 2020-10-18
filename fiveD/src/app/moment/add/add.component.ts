import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { toasterConfig } from '../../../global/helper';
import { MomentService } from 'src/services/moment.service';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  fileInput;
  showError = false;
  base64: any;
  faSpinner = faSpinner;
  loader = false;
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

  validateForm(form) {
    let formisValid = true;
    if (!this.fileInput || !form.value.tags || !form.value.comment) {
      this.toastr.error('', 'All the fields are required', toasterConfig);
      formisValid = false;
    }
    return formisValid;
  }
  onSubmit = (f: NgForm) => {
    if (this.validateForm(f)) {
      const formData: FormData = new FormData();
      formData.append('data', JSON.stringify(f.value));
      formData.append('image', this.fileInput, this.fileInput.name);
      this.loader = true;
      this.momentService.createMomentService(formData).subscribe(
        (result) => {
          this.loader = false;
          if (result && result.status === 200) {
            this.router.navigate(['/list-moment']);
            this.toastr.info('', result.message, toasterConfig);
          } else {
            this.toastr.error('', result.message, toasterConfig);
          }
        },
        (error) => {
          this.loader = false;
          this.toastr.error('', 'Service Failed', toasterConfig);
        }
      );
    }
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
