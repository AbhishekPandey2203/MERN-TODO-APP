import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });
    res.status(200).json({ msg: "Todo found", todos });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: "Internal Server Error" });
  }
};

export const getTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).json({ msg: "Todo Not found" });
    }
    if (todo.user.toString() !== req.user) {
      res.status(401).json({ msg: "Not Authorized" });
    }
    res.status(200).json({ msg: "Todo found", todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: "Internal Server Error" });
  }
};

export const createTodo = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const todo = await Todo.create({
      title,
      description,
      completed: false,
      user: req.user,
    });

    res.status(201).json({ msg: "Todo Created Successfully", todo });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: "Internal Server Error" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo Not found" });
    }

    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    todo.title = title;
    todo.description = description;
    todo.completed = completed;

    await todo.save();
    res.status(200).json({ msg: "Todo Updated Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: "Internal Server Error" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(404).json({ msg: "Todo Not found" });
    }

    if (todo.user.toString() !== req.user) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    await todo.deleteOne();
    res.status(200).json({ msg: "Todo Deleted Successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ errors: "Internal Server Error" });
  }
};
