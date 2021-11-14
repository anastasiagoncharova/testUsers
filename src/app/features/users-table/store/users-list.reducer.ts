import {
  UsersListActions,
  GET_USERS_LIST_REQUEST,
  GET_MALE_USERS_LIST_SUCCESS,
  GET_FEMALE_USERS_LIST_SUCCESS,
  GET_USERS_LIST_FAILURE,
  GET_EDITED_USER_SUCCESS,
  SET_EDITED_USER_SUCCESS,
  SET_REMOVED_USER_SUCCESS
} from './users-list.actions';

export interface UsersListState {
  maleUsersList: any[];
  femaleUsersList: any[];
  isUsersListLoading: boolean;
  getEditedUser: any;
  setEditedUser: any;
  removedUser: any;
}

const initialState: UsersListState = {
  maleUsersList: null,
  femaleUsersList: null,
  isUsersListLoading: false,
  getEditedUser: null,
  setEditedUser: null,
  removedUser: null
};

export function usersListReducer(state = initialState, action: UsersListActions) {
  switch (action.type) {
    case GET_USERS_LIST_REQUEST:
      return {...state, isUsersListLoading: true};
    case GET_MALE_USERS_LIST_SUCCESS:
      return {
        ...state,
        maleUsersList: action.payload.maleUsersList,
        isUsersListLoading: false
      };
    case GET_FEMALE_USERS_LIST_SUCCESS:
      return {
        ...state,
        femaleUsersList: action.payload.femaleUsersList,
        isUsersListLoading: false
      };
    case GET_USERS_LIST_FAILURE:
      return {...state, isUsersListLoading: false, error: action.payload.error};
    case GET_EDITED_USER_SUCCESS:
      return {...state, getEditedUser: action.payload.getEditedUser};
    case SET_EDITED_USER_SUCCESS:
      return {...state, setEditedUser: action.payload.setEditedUser};
    case SET_REMOVED_USER_SUCCESS:
      const currentTab = localStorage.getItem('currentTab');
      const users = JSON.parse(localStorage.getItem(`${currentTab}Users`));
      const usersList = users.filter(user => user.login.uuid !== action.payload.removedUser);
      return currentTab === 'male' ? {...state, maleUsersList: usersList} : {...state, femaleUsersList: usersList};
    default: {
      return state;
    }
  }
}

export const getMaleUsersList = (state: UsersListState) => state.maleUsersList;
export const getFemaleUsersList = (state: UsersListState) => state.femaleUsersList;
export const getUsersListLoading = (state: UsersListState) => state.isUsersListLoading;
export const getEditedUser = (state: UsersListState) => state.getEditedUser;
export const setEditedUser = (state: UsersListState) => state.setEditedUser;
