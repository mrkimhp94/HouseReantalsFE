import {Component, OnInit} from '@angular/core';
import {User} from '../../interface/user';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {UserServiceService} from '../../service/user-service.service';
import {MatDialog} from '@angular/material/dialog';
import {PopUpContent} from '../../booking-active/popup-form/popup-form.component';
import {GeneralPopupComponent} from '../../general-popup/general-popup.component';
import {NotifyServiceService} from '../../service/notify/notify-service.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  user: Partial<User>;
  updateForm: FormGroup;
  success: boolean;
  message: string;
  isEmailExists: boolean;
  isPhoneExists: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authentication: AuthenticationService,
    private userService: UserServiceService,
    private dialog : MatDialog,
    private notifyService : NotifyServiceService
  ) {
  }

  checkEmail(field: string) {
    this.userService.checkEmail(field).subscribe(data => {
      this.isEmailExists = data;
    });
    return this.isEmailExists;
  }
  checkPhone(field: string) {
    this.userService.checkPhone(field).subscribe(data => {
      this.isPhoneExists = data;
    });
    return this.isPhoneExists;
  }

  ngOnInit() {
    let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    this.userService.getUserInformation(currentUser.id).subscribe(data => {
      this.user = data;
    });
    if (!currentUser.id) {
      this.router.navigateByUrl('/login');
      return;
    }
    this.updateForm = this.formBuilder.group({
      id: currentUser.id,
      username: currentUser.username,
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      userAddress: ['', [Validators.required]]
    });

  }

  updateProfile() {
    if (this.updateForm.valid) {
      if( this.checkEmail(this.user.email)) {
      }
      if(this.checkPhone(this.user.phone)){
      }
      this.authentication.updateProfile(this.user)
        .subscribe(
          next => {
            this.success = next.success;
            this.message = next.message;
            this.notifyService.notify='updateUserSuccess' //set content thong bao
            this.dialog.open(GeneralPopupComponent).afterClosed().subscribe(()=>{
              this.router.navigateByUrl('/');
            })

          }
        );
    } else {
      this.router.navigateByUrl('/edit');
    }
  }
}

