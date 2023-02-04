import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import '../CSS/pages/RecipeInProgress.css';
import { useLocation } from 'react-router-dom';
import IngredientCard from '../components/IngredientCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function RecipeInProgress(props) {
  const { match: { params: { id } } } = props;
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [recipe, setRecipe] = useState({});
  const [category, setCategory] = useState('');
  const [keyName, setKeyName] = useState('');
  const [shared, setShared] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesLocalStorage,
    setFavoritesLocalStorage] = useState(localStorage.getItem('favoriteRecipes'));

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      const favorite = favorites.find((favRecipe) => favRecipe.id === id);
      if (favorite) setIsFavorite(true);
      else setIsFavorite(false);
    }
  }, [id, favoritesLocalStorage]);

  const handleFavorites = () => {
    let favorites = [];
    const favorite = {
      id,
      type: keyName.toLowerCase(),
      nationality: recipe.strArea || '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe?.strAlcoholic || '',
      name: recipe[`str${keyName}`],
      image: recipe[`str${keyName}Thumb`],
    };

    if (!isFavorite) {
      if (localStorage.getItem('favoriteRecipes')) {
        favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      }
      favorites.push(favorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
      const favorites2 = favorites.filter((fav) => fav.id !== id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites2));
    }
    setFavoritesLocalStorage(localStorage.getItem('favoriteRecipes'));
  };

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
    } else {
      setUrl(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
      setCategory('drinks');
      setKeyName('Drink');
    }
  }, [location.pathname, id]);

  useEffect(() => {
    if (url) fetchApi();
  }, [fetchApi, url]);

  const ingredientsList = () => {
    const ingredients = [];
    const size = 20;

    for (let i = 1; i < size; i += 1) {
      if (recipe[`strIngredient${i}`] && recipe[`strMeasure${i}`]) {
        const name = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        ingredients.push({ name, measure });
      }
    }

    return ingredients;
  };

  const path = `http://localhost:3000${location.pathname}`;
  const pathname = path.substring(0, path.indexOf('/in-progress', 1));

  return (
    <div className="div-recipe-inprogress">
      <h1 data-testid="recipe-title" className="title-inprogress">Recipe in Progress</h1>
      <hr size="1" className="hr-1" />

      <img
        src={ recipe[`str${keyName}Thumb`] }
        alt={ recipe[`id${keyName}`] }
        data-testid="recipe-photo"
        width="400px"
        className="img-inprogress"
      />

      <br />

      <div className="icons-inprogress">
        <img
          src={ shareIcon }
          alt="share"
          role="presentation"
          data-testid="share-btn"
          onClick={ () => {
            copy(pathname);
            setShared(true);
          } }
        />
        <img
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="favorite"
          role="presentation"
          data-testid="favorite-btn"
          className="fav-inprogress"
          onClick={ handleFavorites }
        />
      </div>
      {shared && <small>Link copied!</small>}
      <p data-testid="instructions" className="instruction">{recipe.strInstructions}</p>

      {/* <Button
        type="button"
        variant="outline-success"
        data-testid="share-btn"
        // onClick={ handleShare }
      >
        Share
      </Button> */}
      <div className="btns-inprogress">
        <Button
          type="button"
          variant="outline-success"
          data-testid="favorite-btn"
          // onClick={ handleFavorite }
        >
          Favorite
        </Button>
        <Button
          type="button"
          variant="outline-success"
          className="btn-inprogress"
          data-testid="recipe-category"
        >
          Category
        </Button>

      </div>
      <hr size="1" />

      <br />

      {
        ingredientsList().map((ingredient, index) => (
          <IngredientCard
            ingredient={ ingredient }
            key={ `input${index}` }
            index={ index }
          />
        ))
      }

      <Button
        type="button"
        variant="outline-success"
        data-testid="finish-recipe-btn"
        className="btn-finish-recipe"
      // onClick={ handleFinish }
      >
        Finish Recipe
      </Button>
    </div>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default RecipeInProgress;
