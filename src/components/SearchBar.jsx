import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SearchContext from '../context/SearchContext';
import searchIcon from '../images/searchIcon.svg';
import '../CSS/components/SearchBar.css';

function SearchBar() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [radioInput, setRadioInput] = useState();
  const { handleSearch } = useContext(SearchContext);

  const handleSearchButton = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleRadioChange = (e) => {
    setRadioInput(e.target.value);
  };

  return (
    <div>
      <img
        className="img-search"
        src={ searchIcon }
        alt="search"
        data-testid="search-top-btn"
        role="presentation"
        onClick={ handleSearchButton }
      />
      { showSearchBar
      && (
        <div className="div-searchBar">
          <Form.Control
            className="flow-text"
            type="text"
            name="searchInput"
            id="search-input"
            value={ searchInput }
            onChange={ handleInputChange }
            data-testid="search-input"
            placeholder="Look for a recipe"
          />
          <div className="mb-3  the-3-radios">
            <Form.Check id="check-api-radio">
              <Form.Check.Label htmlFor="ingredient-search-radio">
                <Form.Check.Input
                  isValid
                  type="radio"
                  id="ingredient-search-radio"
                  data-testid="ingredient-search-radio"
                  value="Ingredient"
                  onClick={ handleRadioChange }
                  name="button"
                />
                Ingredient
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id="check-api-radio">
              <Form.Check.Label htmlFor="name-search-radio">
                <Form.Check.Input
                  isValid
                  type="radio"
                  id="name-search-radio"
                  data-testid="name-search-radio"
                  value="Name"
                  onClick={ handleRadioChange }
                  name="button"
                />
                Name
              </Form.Check.Label>
            </Form.Check>

            <Form.Check id="check-api-radio">
              <Form.Check.Label htmlFor="first-letter-search-radio">
                <Form.Check.Input
                  isValid
                  type="radio"
                  id="first-letter-search-radio"
                  data-testid="first-letter-search-radio"
                  value="First letter"
                  onClick={ handleRadioChange }
                  name="button"
                />
                First letter
              </Form.Check.Label>
            </Form.Check>
          </div>
          <Button
            className="btn-search"
            data-testid="exec-search-btn"
            onClick={ () => handleSearch({ searchInput, radioInput }) }
            variant="outline-success"
          >
            Search
          </Button>
        </div>) }
    </div>
  );
}

export default SearchBar;
