import React, { useContext, useState } from 'react';
import { AppContext } from '../context/App_Context';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useContext(AppContext);
  const [name, setName] = useState('');
  const [gmail, setGmail] = useState('');
  const [password, setPassword] = useState('');

  const registerHandler = async (e) => {
    e.preventDefault();
    const result = await register(name, gmail, password);
    toast(result.data.message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
    if (result.data.message !== 'User Already exist') {
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className="container my-5 p-5"
        style={{
          width: '500px',
          border: '2px solid yellow',
          borderRadius: '10px',
        }}
      >
        <h2 className="text-center">Sign Up</h2>
        <form
          onSubmit={registerHandler}
          style={{ width: '420px', margin: 'auto' }}
          className="my-3 p-3"
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="container d-grid col-6">
            <button type="submit" className="btn btn-primary my-3">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
