import React, { useContext } from 'react';
import { AppContext } from '../context/App_Context';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user, userRecipe, token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/${id}`, {
          headers: { Auth: token },
        });
        toast.success('Recipe deleted!');
        // Optionally refresh the list
        window.location.reload();
      } catch (err) {
        toast.error('Failed to delete recipe');
      }
    }
  };

  return (
    <>
      <div className="container text-center my-3">
        <h1>Welcome,{user.name}</h1>
        <h2>{user.gmail}</h2>
      </div>

      <div className="container">
        <div className="text-center mx-auto" style={{ width: '1200px' }}>
          <div className="row d-flex justify-content-center align-items-center">
            {' '}
            {userRecipe?.map((data) => (
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
                    <button
                      onClick={() => navigate(`/edit/${data._id}`)}
                      className="btn btn-info mx-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn btn-danger mx-2"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
