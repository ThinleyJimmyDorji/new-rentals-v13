import { Injectable } from '@angular/core';
import {BaseFacadeService} from "@new-rentals/shared";
import {UserStateService} from "./user-state.service";
import {UserStoreEnum, UserStoreState} from "../models/user.store.state";
import {UserApiService} from "./user-api.service";
import {Observable, mapTo, tap} from "rxjs";
import {UserBlService} from "./user-bl.service";


@Injectable({
  providedIn: 'root'
})
export class UserFacadeService extends BaseFacadeService<UserStateService, UserStoreState>{

  constructor(private userStateService: UserStateService, private userApiService: UserApiService, private userBlService: UserBlService) {
    super(userStateService);
  }

  getUsers(): Observable<boolean> {
    return this.userApiService.getUsers({}).pipe(tap((users) => {
      this.updateSpecificState(users, UserStoreEnum.USERS);
      this.updateSpecificState(this.userBlService.getTableDataSource(users), UserStoreEnum.USER_TABLE_DATA);
    }),mapTo(true));
  }
}
