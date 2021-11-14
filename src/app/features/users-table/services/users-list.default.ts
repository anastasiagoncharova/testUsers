export const defaultUsersListTableColumns = [
  {
    id: 'userFirstName',
    attr: 'firstName',
    displayName: 'First Name',
    type: 'text'
  },
  {
    id: 'userLastName',
    attr: 'lastName',
    displayName: 'Last Name',
    type: 'text'
  },
  {
    id: 'userEmail',
    attr: 'email',
    displayName: 'Email',
    type: 'text'
  },
  {
    id: 'userCountry',
    attr: 'country',
    displayName: 'Country',
    type: 'text'
  },
  {
    id: 'userPhone',
    attr: 'phone',
    displayName: 'Phone',
    type: 'text'
  },
  {
    id: 'userImage',
    attr: 'image',
    displayName: '',
    sortDisabled: true,
    type: 'image'
  },
  {
    id: 'userActions',
    attr: 'actions',
    displayName: '',
    type: 'actions',
    sortDisabled: true,
    actions: [
      {id: 'deleteUser', displayName: 'Delete', icon: 'delete'},
    ]
  }
];
