import React, { useContext, useState } from 'react'
import { AppContext } from '../context/App_Context'
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { Children } from 'react';

const AddRecipe = () => {

  const navigate = useNavigate();
  const { addRecipe } = useContext(AppContext);
  const[formData, setFormData] = useState({
    title : "",
    ist : "",
    ing1 : "",
    ing2 : "",
    ing3 : "",
    ing4 : "",
    qty1 : "",
    qty2 : "",
    qty3 : "",
    qty4 : "",
    imgurl : "",
});

const onChangeHandler = (e) => {
  const {name,value} = e.target;
  setFormData({...formData,[name]:value})
}

const {title,
  ist,
  ing1,
  ing2,
  ing3,
  ing4,
  qty1,
  qty2,
  qty3,
  qty4,
  imgurl} = formData;

const onSubmitHandler = async (e) => {
   e.preventDefault();
   try{
   const result = await addRecipe(title,
    ist,
    ing1,
    ing2,
    ing3,
    ing4,
    qty1,
    qty2,
    qty3,
    qty4,
    imgurl);
   console.log("Add recipe formData:",result);
   toast.success("Recipe added successfully!");
   setTimeout(()=>
   navigate("/")
   ,1500);
   } catch(error) {
    console.log("Error adding recipe:",error);
    toast.error("Failed to add recipe");
   }
};

  return (
    <>
    <div className="container my-5 p-5" style={{width:'500px', border:'2px solid yellow', borderRadius:'10px'
    }}>
    <h2 className='text-center'>Add Recipe</h2>
     <form onSubmit={onSubmitHandler} style={{width:'400px', margin:'auto'}} className='my-3 p-3'>
        <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input name='title' value={formData.title} onChange={onChangeHandler} type="text" className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>
   
   <div className="mb-3">
    <label htmlFor="exampleInputInstruction" className="form-label">Instruction</label>
    <input name='ist' type="text" value={formData.ist} onChange={onChangeHandler} className="form-control" id="exampleInputInstruction1" aria-describedby="InstructionHelp" />
  </div> 
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Ingredient-1</label>
    <input name='ing1' type="text" value={formData.ing1} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div> 
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Ingredient-2</label>
    <input name='ing2' type="text" value={formData.ing2} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div> 
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Ingredient-3</label>
    <input name='ing3' type="text" value={formData.ing3} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Ingredient-4</label>
    <input name='ing4' type="text" value={formData.ing4} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Quantity-1</label>
    <input name='qty1' type="text" value={formData.qty1} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Quantity-2</label>
    <input name='qty2' type="text" value={formData.qty2} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Quantity-3</label>
    <input name='qty3' type="text" value={formData.qty3} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Quantity-4</label>
    <input name='qty4' type="text" value={formData.qty4} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Image URL</label>
    <input name='imgurl' type="url" value={formData.imgurl} onChange={onChangeHandler} className="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
  </div>
  
  <div className="container d-grid col-6">
  <button type="submit" className="btn btn-primary my-3">Submit</button>
  </div>
</form> 
</div>
    </>
  )
}

export default AddRecipe;
