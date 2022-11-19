import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";

@Component({
  selector: 'new-rentals-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {type: string, iconColor: string, iconType: string, message: string, translate?: boolean},
    private snackBarRef: MatSnackBarRef<NotificationComponent>
  ) {}

  closeSnackbar(): void {
    this.snackBarRef.dismiss();
  }

}
