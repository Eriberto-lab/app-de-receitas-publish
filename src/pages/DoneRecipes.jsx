import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import '../CSS/pages/DoneRecipes.css';
import DoneOrFavoriteRecipeCard from '../components/DoneOrFavoriteRecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const handleTypeFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(doneRecipes);
    else {
      const filtered = doneRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  return (
    <div className="kkk">
      <Header title="Done Recipes" profile />
      <div className="div-btns-done-recipes">
        <Button
          type="button"
          variant="outline-success"
          value="meal"
          data-testid="filter-by-meal-btn"
          onClick={ handleTypeFilter }
        >
          Meals
        </Button>
        <Button
          type="button"
          variant="outline-success"
          value="drink"
          data-testid="filter-by-drink-btn"
          onClick={ handleTypeFilter }
        >
          Drinks
        </Button>
        <Button
          type="button"
          variant="outline-success"
          value="all"
          data-testid="filter-by-all-btn"
          onClick={ handleTypeFilter }
        >
          All
        </Button>
      </div>
      { filteredRecipes.map((doneRecipe, i) => (<DoneOrFavoriteRecipeCard
        key={ `done-recipe-card-${i}` }
        index={ i }
        recipe={ doneRecipe }
        doneOrFav="done"
        handleFavorites=""
      />))}
    </div>
  );
}

export default DoneRecipes;
