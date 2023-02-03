import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import SearchContext from '../context/SearchContext';
import RecommendationCard from '../components/RecommendationCard';
import '../CSS/pages/RecipeDetails.css';
import '../style/RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function RecipeDetails(props) {
  const { match } = props;
  const { id } = match.params;
  const location = useLocation();
  const history = useHistory();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState();
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [keyName, setKeyName] = useState('');
  const [recCategory, setRecCategory] = useState('');
  const [showStartRecipeBtn, setShowStartRecipeBtn] = useState(true);
  const [continueBtn, setContinueBtn] = useState(false);
  const [shared, setShared] = useState(false);
  const { searchResult } = useContext(SearchContext);
  const YT = 32;
  const MAX_RECOMENDATION = 6;

  let recomendations = [];

  if (searchResult[recCategory]) {
    recomendations = searchResult[recCategory].slice(0, MAX_RECOMENDATION);
  }

  if (localStorage.getItem('doneRecipes')) {
    const doneRecipes = [...JSON.parse(localStorage.getItem('doneRecipes'))];
    const isDone = doneRecipes.find((doneRecipe) => doneRecipe.id === id);
    if (isDone) setShowStartRecipeBtn(false);
  }

  const fetchApi = useCallback(async () => {
    const response = await fetch(url);
    const json = await response.json();
    setRecipe(json[category][0]);
  }, [url, category]);

  useEffect(() => {
    if (location.pathname.includes('meals')) {
      setUrl(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('meals');
      setKeyName('Meal');
      setRecCategory('drinks');
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('drinks');
      setKeyName('Drink');
      setRecCategory('meals');
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  useEffect(() => {
    if (recipe) {
      const recipeIngredients = [];
      for (let i = 1; i < 100; i += 1) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient) recipeIngredients.push({ ingredient, measure });
        else break;
      }
      setIngredients(recipeIngredients);
    }
  }, [recipe]);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (inProgressRecipes[category]) setContinueBtn(true);
    }
  }, [category]);

  return (
    <div className="div-details">
      { ingredients && (
        <div className="details-about-all-recipe">
          <img
            className="img-details"
            src={ recipe[`str${keyName}Thumb`] }
            alt="recipe"
            data-testid="recipe-photo"
          />
          <h2
            data-testid="recipe-title"
            className="recipe-title"
          >
            { recipe[`str${keyName}`] }
          </h2>
          <h3
            data-testid="recipe-category"
            className="recipe-category"
          >
            { recipe.strCategory }
            { category === 'drinks' && <small>{ ` (${recipe.strAlcoholic})` }</small> }
          </h3>
          <hr size="1" />
          <ListGroup variant="flush">
            { ingredients.map((ingredient, i) => (
              <ListGroup.Item
                key={ i }
                data-testid={ `${i}-ingredient-name-and-measure` }
                className="list-details"
              >
                <strong>{ingredient.measure}</strong>
                { ingredient.measure && ' of ' }
                {ingredient.ingredient}
              </ListGroup.Item>))}
          </ListGroup>
          <hr size="8" />
          <p
            data-testid="instructions"
            className="text-details"
          >
            { recipe.strInstructions }
          </p>
          <hr size="8" />
          { category === 'meals' && recipe.strYoutube && <iframe
            className="video-youtube"
            title="recipe-video"
            width="420"
            height="315"
            src={ `http://www.youtube.com/embed/${recipe?.strYoutube.slice(YT)}` }
            data-testid="video"
          /> }
        </div>)}
      <div className="div-share-icon-N-btn-fav">
        <Button
          className="favorite-btn"
          variant="outline-success"
          type="button"
          data-testid="favorite-btn"
        >
          Add to Favorites
        </Button>
      </div>
      { shared && <small>Link copied!</small> }
      <div className="recommendation-container">
        { recomendations
          .map((recomendation, i) => (
            <RecommendationCard
              key={ `recipe-card-${i}` }
              index={ i }
              recipe={ recomendation }
            />))}
      </div>
      { showStartRecipeBtn && (
        <Button
          className="start-recipe-btn"
          variant="outline-success"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(`${location.pathname}/in-progress`) }
        >
          { continueBtn ? 'Continue Recipe' : 'Start Recipe' }
        </Button>)}
      <img
        src={ shareIcon }
        className="share"
        alt="share"
        role="presentation"
        data-testid="share-btn"
        onClick={ () => {
          copy(`http://localhost:3000${location.pathname}`);
          setShared(true);
        } }
      />
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
  }),
}.isRequired;

export default RecipeDetails;
