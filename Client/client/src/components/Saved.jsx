import React, { useContext } from 'react';
import { AppContext } from '../context/App_Context';
import { Link, useNavigate } from 'react-router-dom';

const Saved = () => {
  const { savedRecipe, recipe } = useContext(AppContext);
  const navigate = useNavigate();
  // Get the full recipe objects for saved recipes
  const savedRecipeIds = savedRecipe?.map((item) => item.recipe);
  const savedRecipesData = recipe.filter((r) =>
    savedRecipeIds?.includes(r._id)
  );

  return (
    <div className="text-center mx-auto" style={{ width: '1200px' }}>
      <div className="row d-flex justify-content-center align-items-center">
        {savedRecipesData.length > 0 ? (
          savedRecipesData.map((data) => (
            <div key={data._id} className="col-md-3 my-3 gap-1">
              <div
                className="card bg-dark text-light"
                style={{
                  width: '18rem',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onClick={() => navigate(`/${data._id}`)}
                style={{
                  width: '18rem',
                  minHeight: '120px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img
                  src={data.imgurl}
                  style={{
                    width: '250px',
                    height: '200px',
                    borderRadius: '10px',
                    border: '2px solid yellow',
                    marginTop: '10px',
                  }}
                  className="card-img-top"
                  alt={data.title}
                />
                <div className="card-body d-flex flex-column justify-content-center align-items-center">
                  <h5 className="card-title">{data.title}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center">
            <h4>No saved recipes found.</h4>
            <Link to="/" className="btn btn-warning mt-3">
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Saved;
