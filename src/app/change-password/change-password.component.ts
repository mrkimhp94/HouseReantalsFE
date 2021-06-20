// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../service/authentication.service';
import {UserServiceService} from '../service/user-service.service';
import {Users} from '../model/users';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  username: string;
  registerForm: FormGroup;
  // @ts-ignore
  user: Partial<Users>;
  oldPassword: string;
  newPassword: string;
  status: string;
  loginForm: FormGroup;


  constructor(private userService: UserServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private auth: AuthenticationService,
              private fb: FormBuilder) { }

  // ngOnInit(): void {
  //   const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
  //   this.user = currentUser;
  //   this.registerForm = this.fb.group({
  //     confirm: ['', [Validators.required, Validators.minLength(6)]],
  //     pwGroup: this.fb.group({
  //       password: ['', [Validators.required, Validators.minLength(6)]],
  //       confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  //     }, {validator: comparePassword}),
  //   });
  //   // // this.userService.getCurrentUser().subscribe(data => {
  //   // this.user = this.userService.getCurrentUser();
  //   // this.userService.getUserInformation(currentUser.id).subscribe(data => {
  //   //   this.user = data;
  //   // });
  //   console.log(this.user);
  //   // });
  // }
  ngOnInit(): void {
    this.username = localStorage.getItem('currentUser');
    const currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(currentUser);
    console.log(this.username);
    this.userService.getUserInformation(currentUser.id).subscribe(data => {
      console.log(data);
      this.user = data;
      console.log(this.user.userId);
    });
    this.registerForm = this.fb.group({
      confirm: ['', [Validators.required, Validators.minLength(6)]],
      pwGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
      }, {validator: comparePassword}),
    });
  }


  updatePassword(): void {
    this.user.password = this.oldPassword;
    console.log(this.user.userId);
    this.auth.confirmPasswordUser1(this.oldPassword + '')
      .subscribe(next => {
        console.log(next);
        this.status = next.message;
        if (this.status === 'confirm Succssess') {
          this.status = '';
          this.user.password = this.newPassword;
          this.auth.updateUser(this.user)
            .subscribe(data => {
              alert('Ban da update thanh cong');
              this.username = data.fullname;
              localStorage.setItem('currentUser', data.fullname);
              this.loginForm = this.formBuilder.group({
                username: [data.fullname, Validators.required],
                password: [this.oldPassword, Validators.required]
              });
              this.auth.login(this.loginForm.value).subscribe(
                next1 => {
                  localStorage.setItem('token', next1.data.token);
                });
            });
          return;
        }
        this.router.navigateByUrl('/house');
      });
    alert('Bạn nhập mật khẩu hiện tại không chính xác');
  }
}
