import { useState } from 'react';
import { toast } from 'react-toastify';
import { BiSearchAlt2 } from 'react-icons/bi';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.min.css';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchQuery = e => {
    setSearchQuery(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.warn('Please, enter search query!');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };
  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <BiSearchAlt2 />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          value={searchQuery}
          placeholder="Search images and photos"
          onChange={handleSearchQuery}
        />
      </form>
    </header>
  );
}

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
