import PropTypes from 'prop-types';
import css from './ContactItem.module.css';

const ContactItem = ({id, name, number, onDeleteContact}) => {
return (
    <li className={css.contact}>{name}: {number}
    <button type="button" className={css["delete-button"]} onClick={() => onDeleteContact(id)}>Delete</button>
    </li>
)
}

export default ContactItem;

ContactItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
}