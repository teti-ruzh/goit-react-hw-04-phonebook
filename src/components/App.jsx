import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const checkDuplicate = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const formSubmitHandler = ({ name, number }) => {
    if (checkDuplicate(name)) {
      Notify.info(`${name} is already in contacts`);
      return;
    }
    const newContactItem = { id: nanoid(), name, number };
    setContacts(contacts => [newContactItem, ...contacts]);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };

  const visibleContacts = getVisibleContacts();

  return (
    <div className={css.container}>
      <div className={css.content}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={formSubmitHandler} />
      </div>

      <div className={css.content}>
        <h2 className={css.title}>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
