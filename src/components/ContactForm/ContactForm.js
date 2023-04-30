import { Component } from 'react';
import css from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };


  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
       
          <input
            type="text"
            name="name"
            className={css.inputLine}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleInputChange}
            placeholder='Name'
          />
    
          <input
            type="tel"
            name="number"
            className={css.inputLine}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleInputChange}
            placeholder='Number: xxx-xxx-xxxx'
          />

        <button type="submit" className={css["contact-button"]}>Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
