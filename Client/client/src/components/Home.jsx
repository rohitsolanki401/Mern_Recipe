import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/App_Context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Home = () => {
  const { saveRecipeById } = useContext(AppContext);
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch recipes based on search/category
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/recipes`, {
          params: { search, category },
        });
        setRecipes(res.data.recipes || []);
      } catch (err) {
        setRecipes([]);
      }
      setLoading(false);
    };
    fetchRecipes();
  }, [search, category]);

  const saved = async (id) => {
    const result = await saveRecipeById(id);
    toast.success(result.data.message);
    console.log('saved recipe:', result);
  };

  return (
    <>
      <div className="container my-3">
        <div className="row mb-3">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search recipes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="form-control"
            >
              <option value="">All Categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch/Dinner">Lunch/Dinner</option>
              <option value="Snack">Snack</option>
              <option value="Dessert">Dessert</option>
            </select>
          </div>
        </div>
      </div>
      <div className="text-center mx-auto" style={{ width: '1200px' }}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row d-flex justify-content-center align-items-center">
            {recipes.length > 0 ? (
              recipes.map((data) => (
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
              ))
            ) : (
              <div>No recipes found.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
