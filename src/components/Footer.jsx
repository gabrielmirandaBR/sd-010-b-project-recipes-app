import React from 'react';
import { useHistory } from 'react-router';

import '../styles/Footer.css';

import Drink from '../images/drinkIcon.svg';
import Explore from '../images/exploreIcon.svg';
import teste from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  function teste2(event) {
    const { name } = event.target;
    history.push(`/${name}`);
  }

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ (event) => teste2(event) }
      >
        <img
          src={ Drink }
          alt="drink"
          name="bebidas"
          data-testid="drinks-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ (event) => teste2(event) }
      >
        <img
          src={ Explore }
          alt="explore"
          name="explorar"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ (event) => teste2(event) }
      >
        <img
          src={ teste }
          alt="food"
          name="comidas"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
