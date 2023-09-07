import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contactsSlice';
import { getFilteredContacts } from '../../redux/selectors';
import './ContactsList.scss';

const ContactsList = () => {
  const contactsSelector = state => getFilteredContacts(state);
  const contacts = useSelector(contactsSelector);

  const dispatch = useDispatch();

  const deleteContactHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      {contacts && contacts.length > 0 ? (
        <ul className="ContactList">
          {contacts.map(({ id, name, number }) => (
            <li key={id} className="ContactList__item">
              {name}: {number}
              <button
                type="button"
                className="ContactList__btn"
                onClick={() => deleteContactHandler(id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No saved contacts.</p>
      )}
    </div>
  );
};

export default ContactsList;
