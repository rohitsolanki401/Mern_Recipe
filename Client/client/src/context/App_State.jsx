import React, { useEffect, useState } from 'react';
import { AppContext } from './App_Context';
import axios from 'axios';

const AppState = (props) => {
  const url = 'http://localhost:3000/api';
  // Load token from localStorage if present
  const [token, setToken] = useState(()=> localStorage.getItem('token') || '');
  const [recipe, setRecipe] = useState([]);
  const [savedRecipe, setSavedRecipe] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [userRecipe, setUserRecipe] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reload,setReload] = useState(true)

  useEffect(() => {
    // Fetch all recipes
    const fetchRecipe = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      // console.log("recipe data",api.data.recipe);
      setRecipe(api.data.recipe);
    };
    fetchRecipe();
    getSavedRecipeById();
    profile();
    recipeByUser(userId);
  }, [token,userId,reload]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
    setIsAuthenticated(true)
  }, [token,reload]);

  // login
  const login = async (gmail, password) => {
    const api = await axios.post(
      `${url}/login`,
      {
        gmail,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    setToken(api.data.token);
    setIsAuthenticated(true)
    console.log('login data', api);
    return api;
  };

  // register
  const register = async (name, gmail, password) => {
    const api = await axios.post(
      `${url}/register`,
      {
        name,
        gmail,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('register data:', api);
    return api;
  };

  // Add Recipe
  const addRecipe = async (
    title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl
  ) => {
    const api = await axios.post(
      `${url}/add`,
      {
        title,
        ist,
        ing1,
        ing2,
        ing3,
        ing4,
        qty1,
        qty2,
        qty3,
        qty4,
        imgurl,
      },
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log('create recipe data:', api);
    setReload(!reload)
    return api;
  };

  // Fetch Recipe by ID
  const fetchRecipeById = async (id) => {
    const api = await axios.get(`${url}/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('recipe by id:', api);
    return api;
  };

  // Save Recipe by ID
  const saveRecipeById = async (id) => {
    const api = await axios.post(
      `${url}/${id}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Auth: token,
        },
        withCredentials: true,
      }
    );
    console.log('save recipe by id:', api);
    setReload(!reload);
    return api;
  };

  // Get Saved Recipe by ID
  const getSavedRecipeById = async () => {
    const api = await axios.get(
      `${url}/saved`,

      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );
    console.log('getting saved recipe by Id:', api.data.recipe);
    setSavedRecipe(api.data.recipe);
    //return api;
  };

  // profile
  const profile = async () => {
    const api = await axios.get(`${url}/user`, {
      headers: {
        'Content-Type': 'application/json',
        Auth: token,
      },
      withCredentials: true,
    });
    // console.log('This is user profile', api.data.user);
    setUserId(api.data.user._id)
    setUser(api.data.user)
  };

  // get recipe by userId
  const recipeByUser = async (id) => {
    const api = await axios.get(`${url}/user/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log('user specific recipe', api);
    setUserRecipe(api.data.recipe)
  }

  // logout
  const logout = () => {
    localStorage.removeItem("token",token);
    setToken("")
    setIsAuthenticated(false)
  }
 
  return (
    <div>
      <AppContext.Provider
        value={{
          login,
          register,
          addRecipe,
          token,
          recipe,
          fetchRecipeById,
          saveRecipeById,
          savedRecipe,
          userRecipe,
          user,
          isAuthenticated,
          setIsAuthenticated,
          logout
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppState;
