import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {register} from 'ts-node';
import firebase from 'firebase';
import {User} from '../interface/user';
import {UserServiceService} from '../service/user-service.service';


function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  avatarDefault = 'https://avi.edu.vn/wp-content/uploads/2019/11/london-2393098.jpg';
  user: Partial<User>;
  success: boolean;
  message: string;
  isUsernameExists: boolean;
  isEmailExists: boolean;
  isPhoneExists: boolean;


  constructor(
    private fb: FormBuilder,
    private authenticationserivce: AuthenticationService,
    private router: Router,
    private usernameservice: UserServiceService
  ) {
  }

  checkUserName(field: string) {
    this.usernameservice.checkUsername(field).subscribe(data => {
      this.isUsernameExists = data;
    });
    return this.isUsernameExists;
  }
  checkEmail(field: string) {
    this.usernameservice.checkEmail(field).subscribe(data => {
      this.isEmailExists = data;
    });
    return this.isEmailExists;
  }
  checkPhone(field: string) {
    this.usernameservice.checkPhone(field).subscribe(data => {
      this.isPhoneExists = data;
    });
    return this.isPhoneExists;
  }

  ngOnInit() {


    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''
        , [Validators.required, Validators.pattern('((0)+([0-9]{9})\\b)')]
      ],
      userAddress: [''
        , [Validators.required, Validators.pattern('[A-Za-z ]+')]
      ],
      fullname: [''
        , [Validators.required, Validators.pattern('[A-Za-z ]+')]
      ]
    });

    this.user = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: '',
      userAddress: '',
      avatarUrl: this.avatarDefault
    };
  }


  register() {
    if (this.registerForm.valid) {
      if (this.checkUserName(this.user.username)){
      }
      if( this.checkEmail(this.user.email)) {
      }
      if(this.checkPhone(this.user.phone)){

      }
        this.authenticationserivce.register(this.user)
          .subscribe(
            next => {
              console.log(next);
              this.success = next.success;
              this.message = next.message;
              alert('Register Success');
              this.router.navigateByUrl('/login');
            })
    } else {
      alert('Register false');
      this.router.navigateByUrl('/register');
    }
  }


//
// getImageUrl(imageUrls: string[]) {
//   this.user.avatar = imageUrls[0];
// }

}
