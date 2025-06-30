import express from 'express'
import {
  add,
  getAllRecipe,
  searchRecipes,
  getRecipeById,
  getRecipeByUserId,
  getSavedRecipe,
  savedRecipeById,
  editRecipe,
  deleteRecipe
} from '../controllers/recipe.js';
import { Authenticate } from '../middlewares/auth.js';

const router = express.Router();

router.use((req, res, next) => {
    console.log('Recipe router hit:', req.method, req.originalUrl);
    next();
  });

// create recipe
router.post('/add', Authenticate, add);

// get all saved Recipe
router.get('/saved', getSavedRecipe);

// search recipes
router.get('/recipes', searchRecipes);

// get recipe by userId
router.get('/user/:id', getRecipeByUserId);

// get all recipe
router.get('/', getAllRecipe);

// saved Recipe by Id
router.post('/:id', Authenticate, savedRecipeById);

// get recipe by Id
router.get('/:id', getRecipeById);

// Edit recipe
router.put('/:id', Authenticate, editRecipe);

// Delete recipe
router.delete('/:id', Authenticate, deleteRecipe);

export default router;