import { Component, OnInit } from '@angular/core';
import * as fromRoot from '../../../app.reducer-ngrx';
import {combineLatest, Subscription} from 'rxjs';
import {UsersListService} from '../services/users-list.service';
import {Store} from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.sass']
})
export class UsersPageComponent implements OnInit {
  subArr: Subscription[] = [];
  currentTab = 'male';
  maleUsers = null;
  femaleUsers = null;
  tabIndex = 0;
  constructor(private usersListService: UsersListService,
              private store: Store<fromRoot.State>,
              private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('currentTab')) {
      this.currentTab = localStorage.getItem('currentTab');
      this.tabIndex = this.currentTab === 'male' ? 0 : 1;
    } else {
      localStorage.setItem('currentTab', 'male');
    }
    if (localStorage.getItem(`${this.currentTab}Users`)) {
      this[`${this.currentTab}Users`] = JSON.parse(localStorage.getItem(`${this.currentTab}Users`));
    } else {
      this.usersListService.getUsers(1, 100, this.currentTab);
    }
    this.subArr.push(combineLatest(this.store.select(fromRoot.getMaleUsersList), this.store.select(fromRoot.getFemaleUsersList),
      this.store.select(fromRoot.setEditedUser)).subscribe((res: any) => {
      if (res[0]) {
        this.maleUsers = res[0];
        localStorage.setItem('maleUsers', JSON.stringify(this.maleUsers));
        if (res[2]) {
          this.setEditedData(res[2]);
        }
      }
      if (res[1]) {
        this.femaleUsers = res[1];
        localStorage.setItem('femaleUsers', JSON.stringify(this.femaleUsers));
        if (res[2]) {
          this.setEditedData(res[2]);
        }
      }
    }));
  }

  setEditedData(data) {
    this.currentTab = localStorage.getItem('currentTab') ? localStorage.getItem('currentTab') : 'male';
    const editedUser = this[`${this.currentTab}Users`].find(user => user.login.uuid === data.login.uuid);
    editedUser.firstName = data.firstName;
    editedUser.email = data.email;
    editedUser.phone = data.phone;
    editedUser.country = data.country;
    localStorage.setItem(`${this.currentTab}Users`, JSON.stringify(this[`${this.currentTab}Users`]));
  }

  onTabChange(event) {
    this.currentTab = event.tab.textLabel.toLowerCase();
    localStorage.setItem('currentTab', this.currentTab);
    if (!this[`${this.currentTab}Users`]) {
      this.usersListService.getUsers(1, 100, this.currentTab);
    }
  }

  onDeleteUserClick(event) {
    this[`${this.currentTab}Users`] = this[`${this.currentTab}Users`].filter(user => user.login.uuid !== event.login.uuid);
    localStorage.setItem(`${this.currentTab}Users`, JSON.stringify(this[`${this.currentTab}Users`]));
  }

  onDetailsClick(user) {
    this.usersListService.getEditedUser(user);
    this.router.navigate([`/users/edit`]);
  }
}
