import React, { useContext, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";
import TodoItems from "./TodoItems";
import { getTodo, getTodos } from "../apiCalls/todo";

const TodoList = () => {
  const { todo, setTodo } = useContext(TodoContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getTodos();
      if (response.status === 200) {
        setTodo(response.data.todos);
      } else {
        alert(response.response.data.msg);
      }
    };
    fetchData();
    
  }, []);

  return (
    <table className="table-auto w-full">
      <thead>
        <th className="border px-4 py-2">Title</th>
        <th className="border px-4 py-2">Description</th>
        <th className="border px-4 py-2">Completed</th>
        <th className="border px-4 py-2">View</th>
        <th className="border px-4 py-2">Update</th>
        <th className="border px-4 py-2">Delete</th>
      </thead>
      <tbody>
        {todo.length > 0 &&
          todo.map((item) => 
             (<TodoItems key={item._id} item={item} />)
          )}
      </tbody>
    </table>
  );
};

export default TodoList;
