import React, { useContext, useState } from 'react'
import { AppContext } from '../context/App_Context'
import { ToastContainer,toast,Bounce} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const {login} = useContext(AppContext);
  const [gmail,setGmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const result = await login(gmail,password);
    toast(result.data.message, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});

setTimeout(()=>{
    navigate('/');
},1500)
  }

  return (
    <>
    <ToastContainer />
    <div className="container my-5 p-5" style={{width:'500px', border:'2px solid yellow', borderRadius:'10px'
    }}>
    <h2 className='text-center'>Login</h2>
     <form onSubmit={loginHandler} style={{width:'420px', margin:'auto'}} className='my-3 p-3'>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
    <input type="email" required value={gmail} onChange={(e) => setGmail(e.target.value)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
  </div>
  
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword1" />
  </div>
  
  <div className="container d-grid col-6">
  <button type="submit" className="btn btn-primary my-3">Login</button>
  </div>
</form> 
</div>
    </>
  );
};

export default Login;
