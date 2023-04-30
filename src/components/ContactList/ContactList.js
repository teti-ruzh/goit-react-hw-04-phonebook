import PropTypes from 'prop-types';
import ContactItem from '../ContactItem';

const ContactList = ({contacts, onDeleteContact}) => {
  return (
    <ul>
      {contacts.map(({id, name, number}) =>
        <ContactItem key={id} id={id} name={name} number={number} onDeleteContact={onDeleteContact}/>)}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ),
};
