import ContactForm from '../ContactForm';
import ContactsList from '../ContactsList';
import Filter from '../Filter';
import './App.scss';

export default function App() {
  return (
    <div className="App__container">
      <h1>Phonebook</h1>
      <ContactForm />

      <h2>Contacts</h2>
      <Filter />
      <ContactsList />
    </div>
  );
}
