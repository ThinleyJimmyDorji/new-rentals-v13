import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedFilterComponent } from './components/advanced-filter/advanced-filter.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import {MatIconModule} from "@angular/material/icon";
import {TranslateModule} from "@ngx-translate/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";

@NgModule({
  imports: [CommonModule, MatIconModule, TranslateModule, MatSnackBarModule],
  declarations: [
    AdvancedFilterComponent,
    NavBarComponent,
    NotificationComponent,
  ],
})
export class SharedModule {}