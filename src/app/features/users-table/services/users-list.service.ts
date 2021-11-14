import { Injectable } from '@angular/core';
import {ApiService} from '../../../shared/api.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../../app.reducer-ngrx';
import * as UsersListActions from './../store/users-list.actions';

@Injectable({
  providedIn: 'root'
})
export class UsersListService {

  constructor(private httpApi: ApiService,
              private store: Store<fromRoot.State>) { }

  getUsers(page, size, gender) {
    this.store.dispatch(new UsersListActions.GetUsersListRequestAction());
    this.httpApi.getListOfUsers(page, size, gender).subscribe((res: any) => {
      res.results.forEach(user => {
        user.firstName = user.name.first;
        user.lastName = user.name.last;
        user.country = user.location.country;
        user.image = user.picture.thumbnail;
      });
      if (gender === 'male') {
        this.store.dispatch(new UsersListActions.GetMaleUsersListSuccessAction({maleUsersList: res.results}));
      } else {
        this.store.dispatch(new UsersListActions.GetFemaleUsersListSuccessAction({femaleUsersList: res.results}));
      }
    }, (err: any) => {
      this.store.dispatch(new UsersListActions.GetUsersListFailureAction({error: err.error.message}));
    });
  }

  getEditedUser(user) {
    this.store.dispatch(new UsersListActions.GetEditedUserSuccessAction({getEditedUser: user}));
  }

  setEditedUser(user) {
    this.store.dispatch(new UsersListActions.SetEditedUserSuccessAction({setEditedUser: user}));
  }

  removeUser(userId) {
    this.store.dispatch(new UsersListActions.RemoveUserSuccessAction({removedUser: userId}));
  }
}
