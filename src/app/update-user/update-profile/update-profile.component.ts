import {Component, OnInit} from '@angular/core';
import {User} from '../../interface/user';
import {Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication.service';
import {UserServiceService} from '../../service/user-service.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authentication: AuthenticationService,
    private userService: UserServiceService
  ) {
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
      this.authentication.updateProfile(this.user)
        .subscribe(
          next => {
            this.success = next.success;
            this.message = next.message;
            alert('Update success');
            this.router.navigateByUrl('/');
          }
        );
    } else {
      alert('Update false');
      this.router.navigateByUrl('/edit');
    }
  }

}
