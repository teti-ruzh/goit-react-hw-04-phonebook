import { Component } from "react";
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import css from './App.module.css';

class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }

  }


  checkDuplicate = newName => {
    return this.state.contacts.find(({ name }) => name === newName);
  };


formSubmitHandler = ({name, number}) => {
  if (this.checkDuplicate(name)){
     Notify.info(`${name} is already in contacts`);
      return;
  }
  const newContactItem = {id: nanoid(), name, number};
  this.setState(({contacts}) => ({
    contacts: [newContactItem, ...contacts]}));
}

changeFilter = event => {
  this.setState({filter: event.currentTarget.value});
}

deleteContact = contactId => {
  this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== contactId),
  }));
};

getVisibleContacts = () => {
  const { filter, contacts} = this.state;
  const normalizedFilter = filter.toLowerCase();

  return contacts.filter(({name}) =>
    name.toLowerCase().includes(normalizedFilter),
  );
};





  render() {
    const {filter} = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={css.container}>
        <div className={css.content}>
        <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={this.formSubmitHandler}/>
          </div>
      
          <div className={css.content}>
      <h2 className={css.title}>Contacts</h2>
      <Filter value={filter} onChange={this.changeFilter}/>
      <ContactList contacts={visibleContacts} onDeleteContact={this.deleteContact} />
      </div>
    </div>
    );
  }
}


export default App;
