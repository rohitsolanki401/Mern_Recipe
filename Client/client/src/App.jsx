import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './components/Login'
import Register from './components/Register'
import AddRecipe from './components/AddRecipe'
import Saved from './components/Saved'
import Home from './components/Home'
import Profile from './components/Profile'
import { ToastContainer,Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import FetchRecipeById from './components/FetchRecipeById'
import Detail from './components/Detail'

const App = () => {
  return (
    <>
    <Router>
    <ToastContainer 
    position= "top-right"
    autoClose= {2000}
    hideProgressBar = {false}
    closeOnClick= {false}
    pauseOnHover= {true}
    draggable= {true}
    progress= {undefined}
    theme= "light"
    transition= {Bounce} />
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/saved' element={<Saved />} />
      <Route path='/add' element={<AddRecipe />} />
      <Route path='/:id' element={<Detail />} />
      </Routes>
      </Router>
    </>
  )
}

export default App
