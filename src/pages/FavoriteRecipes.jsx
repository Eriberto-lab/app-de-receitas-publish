import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import '../CSS/pages/FavoriteRecipes.css';

import DoneOrFavoriteRecipeCard from '../components/DoneOrFavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes,
    setFavoriteRecipes] = useState(JSON
    .parse(localStorage.getItem('favoriteRecipes')) || []);
  const [filteredRecipes, setFilteredRecipes] = useState(favoriteRecipes);

  const handleTypeFilter = ({ target }) => {
    if (target.value === 'all') setFilteredRecipes(favoriteRecipes);
    else {
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === target.value);
      setFilteredRecipes(filtered);
    }
  };

  const handleFavorites = (id) => {
    const favorites = [...JSON.parse(localStorage.getItem('favoriteRecipes'))];
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    const newFilteredRecipes = filteredRecipes.filter((fav) => fav.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    setFavoriteRecipes([...JSON.parse(localStorage.getItem('favoriteRecipes'))]);
    setFilteredRecipes(newFilteredRecipes);
  };

  return (
    <div className="page-fav">
      <Header title="Favorite Recipes" profile />
      { filteredRecipes.map((favoriteRecipe, i) => (<DoneOrFavoriteRecipeCard
        key={ `favorite-recipe-card-${i}` }
        index={ i }
        recipe={ favoriteRecipe }
        doneOrFav="favorite"
        handleFavorites={ handleFavorites }
      />))}
      <div className="all-btns-fav">
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
          value="all"
          variant="outline-success"
          data-testid="filter-by-all-btn"
          onClick={ handleTypeFilter }
        >
          All
        </Button>
      </div>
    </div>
  );
}

export default FavoriteRecipes;
