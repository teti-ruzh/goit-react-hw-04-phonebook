import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({value, onChange}) => {
return (
    <input type="text" className={css.filter} value={value} onChange={onChange} placeholder='Find contacts by name'></input> 
)

}

export default Filter;

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}