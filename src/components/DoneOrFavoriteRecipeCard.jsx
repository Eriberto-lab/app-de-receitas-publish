import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../CSS/pages/FavoriteRecipes.css';
import '../CSS/pages/DoneRecipes.css';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

import '../style/DoneOrFavoriteRecipeCard.css';

const copy = require('clipboard-copy');

function DoneOrFavoriteRecipeCard(props) {
  const [shared, setShared] = useState(false);

  const { recipe, index, doneOrFav, handleFavorites } = props;
  const { id, tags } = recipe;
  const history = useHistory();
  const recipeUrl = `http://localhost:3000/${recipe.type}s/${id}`;

  const firstTags = tags?.slice(0, 2) || [];

  return (
    <div>
      <img
        className={ `${doneOrFav}-recipe-img` }
        src={ recipe.image }
        alt={ `${doneOrFav}-recipe-${index}` }
        data-testid={ `${index}-horizontal-image` }
        role="presentation"
        onClick={ () => history.push(`/${recipe.type}s/${id}`) }
      />
      <div className="fav-or-done">
        <h3
          className="title-fav-or-done"
          data-testid={ `${index}-horizontal-name` }
          role="presentation"
          onClick={ () => history.push(`/${recipe.type}s/${id}`) }
        >
          { recipe.name }
        </h3>
        <h3
          data-testid={ `${index}-horizontal-top-text` }
        >
          { recipe.type === 'meal' && `${recipe.nationality} - ${recipe.category}` }
          { recipe?.alcoholicOrNot }
        </h3>

      </div>
      <h4
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }
      </h4>
      <img
        src={ shareIcon }
        alt="share"
        className="icons-inprogress"
        role="presentation"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => {
          copy(recipeUrl);
          setShared(true);
        } }
      />
      { doneOrFav === 'favorite' && (
        <img
          src={ blackHeart }
          className="icons-inprogress"
          alt="share"
          role="presentation"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleFavorites(id) }
        />) }
      <br />
      { shared && <small>Link copied!</small> }
      <br />
      { firstTags.map((tag) => (
        <span
          key={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { `${tag} ` }
        </span>
      ))}
    </div>
  );
}

DoneOrFavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
  doneOrFav: PropTypes.string,
  handleFavorites: PropTypes.func,
}.isRequired;

export default DoneOrFavoriteRecipeCard;
