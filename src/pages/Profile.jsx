import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../CSS/pages/Profile.css';

function Profile() {
  const email = JSON.parse(localStorage.getItem('user'));

  const history = useHistory();

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" profile />
      <div className="div-profile">
        <h4
          data-testid="profile-email"
          className="email-profile"
        >
          { email?.email }
        </h4>
        <div className="btns-profile">
          <Button
            data-testid="profile-done-btn"
            className="btn-profile"
            variant="outline-success"
            type="button"
            onClick={ handleDoneRecipes }
          >
            Done Recipes
          </Button>
          <Button
            data-testid="profile-favorite-btn"
            className="btn-profile"
            variant="outline-success"
            type="button"
            onClick={ handleFavoriteRecipes }
          >
            Favorite Recipes
          </Button>
          <Button
            variant="outline-success"
            className="btn-profile"
            data-testid="profile-logout-btn"
            type="button"
            onClick={ handleLogout }
          >
            Logout
          </Button>
        </div>
      </div>
      <Footer title="Footer" />
    </div>
  );
}

export default Profile;
