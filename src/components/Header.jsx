import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import '../CSS/components/Header.css';

function Header(props) {
  const { title, profile, search } = props;
  const history = useHistory();

  return (
    <header>
      <div className="header">
        <span className="search-bar">{ search && <SearchBar /> }</span>
        { profile && <img
          className="icon-profile"
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
          role="presentation"
          onClick={ () => history.push('/profile') }
        /> }
      </div>
      <h3 className="title-header" data-testid="page-title">{ title.toUpperCase() }</h3>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  profile: PropTypes.bool,
  search: PropTypes.bool,
}.isRequired;

export default Header;
