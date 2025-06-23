import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/App_Context';
import { Link, useLocation } from 'react-router-dom';

const FetchRecipeById = ({ id }) => {
  const { fetchRecipeById } = useContext(AppContext);
  const [recipe, setRecipe] = useState('');
  const location = useLocation();

  useEffect(() => {
    const fetchRecipe = async (id) => {
      const result = await fetchRecipeById(id);
      console.log('recipe by id:', result);
      setRecipe(result.data.recipe);
    };

    fetchRecipe(id);
  }, [id, fetchRecipeById]);

  // Add loading state check
  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="card bg-dark text-light">
        <div className="row">
          <div className="col-md-4">
            <img
              src={recipe.imgurl}
              className="img-fluid"
              style={{ width: '500px', height: '450px' }}
              alt={recipe.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{recipe.title}</h2>
              
                {location.pathname !== '/saved' && (
                  <>
                  <div className="card-text">
                    {recipe.ist.split(/(?=\d+\.\s)/).map((step, index) => (
                      <p key={index}>{step.trim()}</p>
                    ))}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <h4>Ingredients:</h4>
                      <ul>
                        <li>
                          {recipe.ing1} - {recipe.qty1}
                        </li>
                        <li>
                          {recipe.ing2} - {recipe.qty2}
                        </li>
                        <li>
                          {recipe.ing3} - {recipe.qty3}
                        </li>
                        <li>
                          {recipe.ing4} - {recipe.qty4}
                        </li>
                      </ul>
                    </div>
                  </div>
                  </>
                )}
              {/* Close the fragment if it was opened */}
              <div>
                <Link to={'/'} className="btn btn-warning my-2">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FetchRecipeById;
