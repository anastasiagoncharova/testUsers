import { Action } from '@ngrx/store';

export const GET_USERS_LIST_REQUEST = 'Get users list request';
export const GET_MALE_USERS_LIST_SUCCESS = 'Get male users list success';
export const GET_FEMALE_USERS_LIST_SUCCESS = 'Get female users list success';
export const GET_USERS_LIST_FAILURE = 'Get users list failure';
export const GET_EDITED_USER_SUCCESS = 'Get edited user success';
export const SET_EDITED_USER_SUCCESS = 'Set edited user success';
export const SET_REMOVED_USER_SUCCESS = 'Set removed user success';

export class GetUsersListRequestAction implements Action {
  readonly type = GET_USERS_LIST_REQUEST;
}

export class GetMaleUsersListSuccessAction implements Action {
  readonly type = GET_MALE_USERS_LIST_SUCCESS;
  constructor(public payload: { maleUsersList: any[] }) {
  }
}

export class GetFemaleUsersListSuccessAction implements Action {
  readonly type = GET_FEMALE_USERS_LIST_SUCCESS;
  constructor(public payload: { femaleUsersList: any[] }) {
  }
}

export class GetUsersListFailureAction implements Action {
  readonly type = GET_USERS_LIST_FAILURE;
  constructor(public payload: { error: string }) {
  }
}

export class GetEditedUserSuccessAction implements Action {
  readonly type = GET_EDITED_USER_SUCCESS;
  constructor(public payload: { getEditedUser: any[] }) {
  }
}

export class SetEditedUserSuccessAction implements Action {
  readonly type = SET_EDITED_USER_SUCCESS;
  constructor(public payload: { setEditedUser: any[] }) {
  }
}

export class RemoveUserSuccessAction implements Action {
  readonly type = SET_REMOVED_USER_SUCCESS;
  constructor(public payload: { removedUser: any[] }) {
  }
}

export type UsersListActions =
  GetUsersListRequestAction |
  GetMaleUsersListSuccessAction |
  GetFemaleUsersListSuccessAction |
  GetUsersListFailureAction |
  GetEditedUserSuccessAction |
  SetEditedUserSuccessAction |
  RemoveUserSuccessAction;
