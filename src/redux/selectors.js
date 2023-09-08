import { createSelector } from 'reselect';

export const getContactsList = state => state.contacts.list;

export const getFilter = state => state.filter;

export const getFilteredContacts = createSelector(
  [getContactsList, getFilter],
  (contactList, filter) => {
    return contactList.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  }
);
