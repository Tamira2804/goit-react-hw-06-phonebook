import { createSlice, nanoid } from '@reduxjs/toolkit';
import persistConfig from './persistConfig';
import { persistReducer } from 'redux-persist';

const contactsInitialState = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { list: contactsInitialState },
  reducers: {
    addContact: {
      reducer(state, action) {
        const { name } = action.payload;
        if (
          state.list.some(
            contact =>
              typeof contact.name === 'string' &&
              contact.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          alert(`${name} is already in contacts`);
          return;
        }
        state.list.push(action.payload);
      },
      prepare(text, number) {
        return {
          payload: {
            id: nanoid(),
            name: text,
            number: number,
          },
        };
      },
    },
    deleteContact(state, action) {
      const index = state.findIndex(contact => contact.id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export default persistReducer(persistConfig, contactsSlice.reducer);
