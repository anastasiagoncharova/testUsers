import {Component, OnInit, OnDestroy} from '@angular/core';
import * as fromRoot from '../../../app.reducer-ngrx';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {UsersListService} from '../services/users-list.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.sass']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  userForm: FormGroup;
  subArr: Subscription[] = [];
  editedUser = null;
  editMode = false;
  constructor(private usersListService: UsersListService,
              private router: Router,
              private formBuilder: FormBuilder,
              private store: Store<fromRoot.State>) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      name: [''],
      email: [''],
      phone: [''],
      country: ['']
    });
    this.subArr.push(this.store.select(fromRoot.getEditedUser).subscribe((res: any) => {
      if (!res) {
        return;
      }
      this.editedUser = res;
      this.userForm.patchValue({name: `${this.editedUser.firstName} ${this.editedUser.lastName}`});
      this.userForm.patchValue({email: this.editedUser.email});
      this.userForm.patchValue({phone: this.editedUser.phone});
      this.userForm.patchValue({country: this.editedUser.country});
    }));
  }

  onBackBtnClick() {
    localStorage.removeItem('maleUsers');
    localStorage.removeItem('femaleUsers');
    this.router.navigate([`/users`]);
  }

  onEditClick() {
    if (this.editMode) {
      this.editedUser.firstName = this.userForm.get('name').value.split(' ')[0];
      this.editedUser.firstName = this.userForm.get('name').value.split(' ')[1];
      this.editedUser.email = this.userForm.get('email').value;
      this.editedUser.phone = this.userForm.get('phone').value;
      this.editedUser.country = this.userForm.get('country').value;
      this.usersListService.setEditedUser(this.editedUser);
      this.router.navigate([`/users`]);
    } else {
      this.editMode = true;
    }
  }

  onDeleteClick() {
    this.usersListService.removeUser(this.editedUser.login.uuid);
    this.router.navigate([`/users`]);
  }

  ngOnDestroy() {
    this.usersListService.setEditedUser(null);
  }
}
