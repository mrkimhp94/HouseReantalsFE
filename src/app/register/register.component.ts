import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {register} from 'ts-node';
import firebase from 'firebase';
import {User} from '../interface/user';


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


  constructor(
    private fb: FormBuilder,
    private authenticationserivce: AuthenticationService,
    private router: Router
  ) {
  }

  // @ts-ignore
  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      confirmPassword: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''
        // , [Validators.required, Validators.pattern('((0)+([0-9]{9})\\b)')]
      ],
      userAddress: [''
        // , [Validators.required, Validators.pattern('[A-Za-z ]+')]
      ],
      fullname: [''
        // , [Validators.required, Validators.pattern('[A-Za-z ]+')]
      ]
    });

    this.user = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      phone: '',
      userAddress: '',
      avatar: this.avatarDefault
    };
  }

  register() {
    if (this.registerForm.valid) {
      this.authenticationserivce.register(this.user)
        .subscribe(
          next => {
            this.success = next.success;
            this.message = next.message;
            alert('Register Success');
            this.router.navigateByUrl('/');
          }
        );
    }
  }

  //
  // getImageUrl(imageUrls: string[]) {
  //   this.user.avatar = imageUrls[0];
  // }

}
