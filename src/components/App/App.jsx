import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addContact, deleteContact } from '../../redux/contactsSlice';
import { setFilter } from '../../redux/filterSlice';
import ContactForm from '../ContactForm';
import ContactsList from '../ContactsList';
import Filter from '../Filter';
import './App.scss';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.list);
  const filter = useSelector(state => state.filter);

  const addContactHandler = newContact => {
    dispatch(addContact(newContact));
  };

  const deleteContactHandler = contactId => {
    dispatch(deleteContact(contactId));
  };

  const changeFilterHandler = e => {
    dispatch(setFilter(e.currentTarget.value));
  };

  const normalizedFilter = filter.toLowerCase();
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className="App__container">
      <h1>Phonebook</h1>
      <ContactForm onAddContact={addContactHandler} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilterHandler} />
      {contacts.length > 0 ? (
        <ContactsList
          contacts={filteredContacts}
          onDeleteContact={deleteContactHandler}
        />
      ) : (
        <p>No contacts available.</p>
      )}
    </div>
  );
}

App.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
  filter: PropTypes.string,
  addContactHandler: PropTypes.func,
  deleteContactHandler: PropTypes.func,
  changeFilterHandler: PropTypes.func,
};
