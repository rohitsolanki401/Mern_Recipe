import React, { useContext } from 'react';
import { AppContext } from '../context/App_Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const { recipe, saveRecipeById } = useContext(AppContext);
  const navigate = useNavigate();

  const saved = async (id) => {
    const result = await saveRecipeById(id);
    toast.success(result.data.message);
    console.log('saved recipe:', result);
  };

  return (
    <>
      <div className="text-center mx-auto" style={{ width: '1200px' }}>
        <div className="row d-flex justify-content-center align-items-center">
          {' '}
          {recipe.map((data) => (
            <div key={data._id} className="col-md-3 my-3 gap-1">
              <div
                className="card bg-dark text-light"
                style={{ width: '18rem' }}
              >
                <div className="row d-flex justify-content-center align-items-center">
                  <img
                    src={data.imgurl}
                    style={{
                      width: '250px',
                      height: '200px',
                      borderRadius: '10px',
                      border: '2px solid yellow',
                    }}
                    className="card-img-top"
                    alt="..."
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{data.title}</h5>
                  <p className="card-text">
                    <strong>Category:</strong> {data.category || 'N/A'}
                  </p>
                  <div className="my-3">
                    <button
                      onClick={() => saved(data._id)}
                      className="btn btn-primary mx-3"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => navigate(`/${data._id}`)}
                      className="btn btn-warning"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
