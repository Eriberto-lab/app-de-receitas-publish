import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';
import '../CSS/pages/RecipeInProgress.css';

function IngredientCard({ ingredient, index, id }) {
  const [checked, setchecked] = useState(
    JSON.parse(localStorage.getItem(`${id}-ingredient-${index}`)) || false,
  );

  const handleCheck = () => {
    setchecked(!checked);
    localStorage.setItem(`${id}-ingredient-${index}`, !checked);
  };

  return (
    <div className="mb-3  the-3-radios">
      <Form.Check id="check-api-radio">
        <div className="checks-inprogess">
          <Form.Check.Label
            htmlFor="ingredient-search-checkbox"
            data-testid={ `${index}-ingredient-step` }
            key={ index }
            style={ { textDecoration: checked ? 'line-through solid rgb(0, 0, 0)' : '' } }
          >
            <Form.Check.Input
              isValid
              className="checks"
              type="checkbox"
              id={ `input-${id}-${index}` }
              name={ `input-${id}-${index}` }
              value={ index }
              checked={ checked }
              onChange={ handleCheck }
            />
            {ingredient.name}
          </Form.Check.Label>
        </div>
      </Form.Check>
    </div>
  );
}

IngredientCard.propTypes = {
  index: PropTypes.number,
  ingredient: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
};

IngredientCard.defaultProps = {
  index: 0,
};

export default IngredientCard;
