import { createSelector } from 'reselect';

export const getContactsList = state => state.contacts.list;

export const isContactExists = createSelector(
  [getContactsList],
  contactsList => name => {
    return contactsList.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
  }
);

const getFilteredContactsSelector = state => {
  const filter = state.filter.toLowerCase();
  const contactsList = state.contacts.list;
  return contactsList.filter(contact =>
    contact.name.toLowerCase().includes(filter)
  );
};

export const getFilteredContacts = createSelector(
  [getFilteredContactsSelector],
  filteredContacts => filteredContacts
);

export const getFilter = state => state.filter;
