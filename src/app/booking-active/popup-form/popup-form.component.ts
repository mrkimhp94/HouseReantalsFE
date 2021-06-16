import {Component, EventEmitter, Output,OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {config} from 'rxjs';
import {NotifyServiceService} from '../../service/notify/notify-service.service';
import {element} from 'protractor';

@Component({
  selector: 'popup-button',
  templateUrl: 'popup-form.component.html',
  // styleUrls: ['popup-form.component.css']
})
export class PopUpFormComponent {
  constructor(private dialog: MatDialog, private notifyService: NotifyServiceService) {
  }

  @Output()
  submitEvt = new EventEmitter<any>();

  openDialog() {

    if (this.notifyService.notify == 'valid') {
      const dialogRef = this.dialog.open(PopUpContent);
      dialogRef.afterClosed().subscribe(result => {
        this.submitEvt.emit(result);
      })

    }
    else {
      this.dialog.open(PopUpContent);
    }
  }
}

@Component({
  selector: 'popup',
  templateUrl: 'popup.html',
  styleUrls: ['popup-form.component.css']
})
export class PopUpContent implements OnInit{
  notify: any;

  constructor(private notify2 : NotifyServiceService){
  }

  ngOnInit(): void {
    this.notify = this.notify2.notify
  }

}

