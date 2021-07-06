// import React, { useState } from 'react';
// import PropTypes from 'prop-types';

// import LoginContext from './LoginContext';

// function LoginProvider({ children }) {
//   const [login, setLogin] = useState('');

//   function successLogin(email) {
//     setLogin(email);
//   }

//   return (
//     <LoginContext.Provider value={ { successLogin, login } }>
//       { children }
//     </LoginContext.Provider>
//   );
// }

// LoginProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// export default LoginProvider;
import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [login, setLogin] = useState('');
  const [DoneRecipes, setDoneRecipes] = useState([]);

  function successLogin(email) {
    setLogin(email);
  }

  const getDoneRecipes = useCallback(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage !== null) {
      setDoneRecipes(getLocalStorage);
    }
  }, []);

  const addLocalStorageFood = useCallback((id, food) => {
    const newFavorite = {
      id,
      type:
      `${'comida'}`,
      area:
      `${food.strArea}`,
      category:
      `${food.strCategory}`,
      alcoholicOrNot:
      `${''}`,
      name:
      `${food.strMeal}`,
      image:
      `${food.strMealThumb}`,
    };
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favorites.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
  }, []);

  const addLocalStorageDrink = useCallback((id, drink) => {
    const newFavorite = {
      id,
      type:
      `${'bebida'}`,
      area:
      `${''}`,
      category:
      `${drink.strCategory}`,
      alcoholicOrNot:
      `${drink.strAlcoholic}`,
      name:
      `${drink.strDrink}`,
      image:
      `${drink.strDrinkThumb}`,
    };
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favorites.push(newFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
    }
  }, []);

  const removeLocalStorage = useCallback((id) => {
    if (localStorage.favoriteRecipes) {
      const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const search = favorites.map((item) => item.id).indexOf(id);
      favorites.splice(search, 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(favorites));
    }
  }, []);

  const getLocalStorage = useCallback((id) => {
    if (localStorage.favoriteRecipes) {
      const getRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const teste = getRecipes.map((item) => item.id).includes(id);
      return teste;
    }
  }, []);

  useEffect(() => {
    getDoneRecipes();
  }, [getDoneRecipes]);

  return (
    <LoginContext.Provider
      value={ {
        successLogin,
        login,
        DoneRecipes,
        getDoneRecipes,
        getLocalStorage,
        addLocalStorageFood,
        addLocalStorageDrink,
        removeLocalStorage,
      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
