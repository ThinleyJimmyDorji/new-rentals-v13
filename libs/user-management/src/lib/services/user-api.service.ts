import {Injectable} from '@angular/core';
import {User, UserAttributes, UserFilterAttributes} from "@new-rentals/shared";
import {Apollo, Query} from "apollo-angular";
import {USERS_QUERY} from "../gql/queries";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private apollo: Apollo) { }

  getUsers(params: UserFilterAttributes): Observable<User[]> {
    return this.apollo.query<Query>({
      query: USERS_QUERY,
      fetchPolicy: "no-cache",
      variables: {params}
    }).pipe(map((user) => {
      // @ts-ignore
      return user.data?.['users']
    } ))
  }
}
