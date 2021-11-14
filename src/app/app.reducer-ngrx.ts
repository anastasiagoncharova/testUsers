import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsersList from './features/users-table/store/users-list.reducer';

export interface State {
  usersList: fromUsersList.UsersListState;
}

export const reducers: ActionReducerMap<State> = {
  usersList: fromUsersList.usersListReducer
};

export const getUsersListState = createFeatureSelector<fromUsersList.UsersListState>('usersList');
export const getMaleUsersList = createSelector(getUsersListState, fromUsersList.getMaleUsersList);
export const getFemaleUsersList = createSelector(getUsersListState, fromUsersList.getFemaleUsersList);
export const getUsersListLoading = createSelector(getUsersListState, fromUsersList.getUsersListLoading);
export const getEditedUser = createSelector(getUsersListState, fromUsersList.getEditedUser);
export const setEditedUser = createSelector(getUsersListState, fromUsersList.setEditedUser);
