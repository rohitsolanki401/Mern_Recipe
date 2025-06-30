import React, { useEffect, useContext, useState } from 'react';
import { AppContext } from '../context/App_Context';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditRecipe = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    ist: '',
    ing1: '',
    ing2: '',
    ing3: '',
    ing4: '',
    qty1: '',
    qty2: '',
    qty3: '',
    qty4: '',
    imgurl: '',
    category: '',
  });
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch recipe by id and setFormData
    axios.get(`${import.meta.env.VITE_API_URL}/${id}`).then((res) => {
      setFormData(res.data.recipe);
    });
  }, [id]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/${id}`, formData, {
        headers: { Auth: token },
      });
      toast.success('Recipe updated!');
      setTimeout(() => navigate('/profile'), 1200);
    } catch (error) {
      toast.error('Failed to update recipe');
    }
  };

  return (
    <div
      className="container my-5 p-5"
      style={{
        width: '500px',
        border: '2px solid yellow',
        borderRadius: '10px',
      }}
    >
      <h2 className="text-center">Edit Recipe</h2>
      <form
        onSubmit={onSubmitHandler}
        style={{ width: '400px', margin: 'auto' }}
        className="my-3 p-3"
      >
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={onChangeHandler}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Instruction</label>
          <input
            name="ist"
            type="text"
            value={formData.ist}
            onChange={onChangeHandler}
            className="form-control"
            required
          />
        </div>
        {/* Ingredients and Quantities */}
        {[1, 2, 3, 4].map((num) => (
          <div className="mb-3" key={num}>
            <label className="form-label">{`Ingredient-${num}`}</label>
            <input
              name={`ing${num}`}
              type="text"
              value={formData[`ing${num}`]}
              onChange={onChangeHandler}
              className="form-control"
            />
            <label className="form-label">{`Quantity-${num}`}</label>
            <input
              name={`qty${num}`}
              type="text"
              value={formData[`qty${num}`]}
              onChange={onChangeHandler}
              className="form-control"
            />
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            name="imgurl"
            type="url"
            value={formData.imgurl}
            onChange={onChangeHandler}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={onChangeHandler}
            className="form-control"
            required
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snack">Snack</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>
        <div className="container d-grid col-6">
          <button type="submit" className="btn btn-primary my-3">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRecipe;
