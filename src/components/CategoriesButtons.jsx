import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../CSS/components/CategoryButtons.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import SearchContext from '../context/SearchContext';

function CategoriesButtons(props) {
  const [results, setResults] = useState([]);
  const { title } = props;
  const { handleFilters, handleSearch } = useContext(SearchContext);
  let url = '';

  if (title === 'Meals') {
    url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  } else {
    url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  }

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();

    if (json.meals) setResults(json.meals);
    else setResults(json.drinks);
  }, [url]);

  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  const MAX_LENGTH = 4;

  const buttonFunction = (index, category) => (
    <Button
      className="category-btns"
      variant="secondary"
      key={ `category-${index}` }
      data-testid={ `${category}-category-filter` }
      onClick={ () => handleFilters(category) }
    >
      { category }
    </Button>
  );

  const btns = (
    <Button
      variant="secondary"
      className="category-btns"
      key="category-all"
      data-testid="All-category-filter"
      onClick={ () => handleSearch({ searchInput: '', radioInput: 'Name' }) }
    >
      All
    </Button>);

  return (
    <Dropdown>
      <Dropdown.Toggle
        className="title-dropdown"
        variant="success"
        id="dropdown-basic"
      >
        Categories
      </Dropdown.Toggle>
      <ButtonGroup className="me-2" aria-label="First group">
        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">
            <div className="all-btns">
              { results
                .map((category, index) => (index <= MAX_LENGTH)
              && buttonFunction(index, category.strCategory)) }
              {btns}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </ButtonGroup>
    </Dropdown>
  );
}

CategoriesButtons.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default CategoriesButtons;
