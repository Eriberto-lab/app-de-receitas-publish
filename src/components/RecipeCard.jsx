import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import '../CSS/components/RecipeCard.css';

function RecipeCard(props) {
  const history = useHistory();
  const location = useLocation();
  const { index, recipe } = props;
  let picture = '';
  let name = '';
  let id = '';

  if (recipe.strMeal) {
    picture = recipe.strMealThumb;
    name = recipe.strMeal;
    id = recipe.idMeal;
  } else {
    picture = recipe.strDrinkThumb;
    name = recipe.strDrink;
    id = recipe.idDrink;
  }

  return (
    <div
      className="div"
      role="presentation"
      data-testid={ `${index}-recipe-card` }
      onClick={ () => history.push(`${location.pathname}/${id}`) }
    >
      <img
        className="img"
        src={ picture }
        alt={ `recipe-${index}` }
        data-testid={ `${index}-card-img` }
      />
      <strong>
        <p data-testid={ `${index}-card-name` } className="name">{ name }</p>
      </strong>
    </div>
  );
}

RecipeCard.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }),
}.isRequired;

export default RecipeCard;
