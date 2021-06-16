import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {HouseService} from '../../service/house/house.service';

import {ImageService} from '../../service/image/image.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Image} from '../../model/image';
import {House} from '../../model/house';
import {User} from '../../interface/user';
import {AuthenticationService} from '../../service/authentication.service';
import {Router} from '@angular/router';
import {UserToken} from '../../model/user-token';


declare var $: any;
declare var Swal: any;
let isValidated = true;

@Component({
  selector: 'app-house-create',
  templateUrl: './house-create.component.html',
  styleUrls: ['./house-create.component.css']
})
export class HouseCreateComponent implements OnInit {
  houseForm: FormGroup = new FormGroup({
    houseName: new FormControl(''),
    houseAddress: new FormControl(''),
    area: new FormControl(''),
    type: new FormControl(''),
    bedroomQuantity: new FormControl(''),
    bathroomQuantity: new FormControl(''),
    description: new FormControl(''),
    pricePerDay: new FormControl()
  });

  selectedImages: any[] = [];

  currentUser: UserToken;
  user: User;



  constructor(private houseService: HouseService,
              private imageService: ImageService,
              private storage: AngularFireStorage,
              private authenticationService: AuthenticationService,
              private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(value => {
      this.currentUser = value;
    });
  }

  ngOnInit() {
    console.log(this.currentUser);
    $(document).ready(function() {
      $('#product-form').validate({
        rules: {
          houseName: {
            required: true
          },
          houseAddress: {
            required: true
          },
          area: {
            required: true
          },
          type: {
            required: true
          },
          bedroomQuantity: {
            required: true
          },
          bathroomQuantity: {
            required: true
          },
          description: {
            required: true
          },
          image: {
            required: true
          }
        },
        messages: {
          houseName: {
            required: 'Hãy nhập tên ngôi nhà của bạn'
          },
          houseAddress: {
            required: 'Hãy nhập địa chỉ cho ngôi nhà'
          },
          area: {
            required: 'Hãy nhập diện tích'
          },
          type: {
            required: 'Hãy nhập kiểu nhà'
          },
          bedroomQuantity: {
            required: 'Hãy nhập số phòng ngủ'
          },
          bathroomQuantity: {
            required: 'Hãy nhập sô phong tắm'
          },
          description: {
            required: 'Hãy nhập mô tả chi tiết cho ngôi nhà của bạn'
          },
          image: {
            required: 'Chọn ảnh cho ngôi nhà'
          }
        },
        errorElement: 'span',
        errorPlacement: function(error, element) {
          isValidated = false;
          error.addClass('invalid-feedback');
          element.closest('.form-group').append(error);
        },
        highlight: function(element, errorClass, validClass) {
          $(element).addClass('is-invalid');
        },
        unhighlight: function(element, errorClass, validClass) {
          $(element).removeClass('is-invalid');
        }
      });
    });
  }

  async createImage() {
    const house = await this.createHouse();
    if (house != null) {
      if (this.selectedImages.length !== 0) {
        this.houseForm.reset();
        for (const selectedImage of this.selectedImages) {
          const filePath = `${house.houseName}/${selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(url => {
                const image: Image = {
                  linkImage: url,
                  house: {
                    houseId: house.houseId
                  }
                };
                this.imageService.createImage(image).subscribe(() => {
                }, () => {
                });
              });
            })
          ).subscribe();
        }
        $(function() {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: true,
            timer: 3000
          });

          Toast.fire({
            type: 'success',
            title: 'Tạo mới thành công'
          });
        });
      }
    } else {
      $(function() {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });

        Toast.fire({
          type: 'error',
          title: 'Tạo mới thất bại'
        });
      });
    }
  }

  createHouse() {
    const house: House = {
      houseName: this.houseForm.value.houseName,
      houseAddress: this.houseForm.value.houseAddress,
      area: this.houseForm.value.area,
      type: this.houseForm.value.type,
      bedroomQuantity: this.houseForm.value.bedroomQuantity,
      bathroomQuantity: this.houseForm.value.bathroomQuantity,
      description: this.houseForm.value.description,
      pricePerDay: this.houseForm.value.pricePerDay,
      houseStatus: 'false',
    };
    if (isValidated) {
      return this.houseService.createHouse(house).toPromise();
    }
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImages = event.target.files;
    } else {
      this.selectedImages = [];
    }
  }

  removeImageFromPreview(index: number) {
    const images = [];
    for (let i = 0; i < index; i++) {
      images[i] = this.selectedImages[i];
    }
    for (let i = index; i < this.selectedImages.length - 1; i++) {
      images[i] = this.selectedImages[i + 1];
    }
    this.selectedImages = images;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }


}
