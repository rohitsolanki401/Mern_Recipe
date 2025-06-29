import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ist: { type: String, required: true },
  imgurl: { type: String, required: true },
  ing1:{type:String},
  ing2:{type:String},
  ing3:{type:String},
  ing4:{type:String},
  qty1:{type:String},
  qty2:{type:String},
  qty3:{type:String},
  qty4:{type:String},
  category: {type:String},
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
});

export const Recipe = mongoose.model("recipe",recipeSchema);

const onSubmitHandler = async (e) => {
  e.preventDefault();
  if (!title || !ist || !imgurl) {
    toast.error("Title, instruction, and image URL are required!");
    return;
  }
  // ...rest
};