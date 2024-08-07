//importing the express-->
import express from "express";
import authorize from "../middleware/authorize.js";

import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todosController.js";
import { createTodoRules, updateTodoRules } from "../middleware/validator.js";
import { validateResult } from "../middleware/validationResults.js";
   
// router featuture importing 

const router = express.Router();

//creating the todo route

router.get("/:id", authorize, getTodo);

router.get("/", authorize, getTodos);

router.post("/create", authorize, createTodoRules, validateResult, createTodo);

router.put(
  "/update/:id",
  authorize,
  updateTodoRules,
  validateResult,
  updateTodo
);

router.delete("/delete/:id", authorize, deleteTodo);

export default router;
