import React,{useContext} from 'react'
import { AppContext } from '../context/App_Context'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {user, userRecipe} = useContext(AppContext)
  const navigate = useNavigate()
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
