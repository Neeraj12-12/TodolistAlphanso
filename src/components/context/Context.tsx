
import React, { createContext, useReducer, useEffect } from "react";
import  { iEachTask } from "../TodoList";
import { v4 as uuidv4 } from "uuid";

interface TodoProps {
    TodoListArray: iEachTask[];
  addTodo: (title: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  filterList: (filter: string) => void;
}

export const TodoContext = createContext<TodoProps | null>(null);


const TodoReducer = (state: iEachTask[], action: any): iEachTask[] => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    case "TOGGLE_TODO":
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    case "DELETE_TODO":
      return state.filter((task) => task.id !== action.payload);
    case "FILTER_TODO_LIST":
   
      return state;
    default:
      return state;
  }
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [TodoListArray, dispatch] = useReducer(TodoReducer, [], () => {
    const localData = localStorage.getItem("TodoList");
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("TodoList", JSON.stringify(TodoListArray));
  }, [TodoListArray]);

  const addTodo = (title: string) => {
    dispatch({
      type: "ADD_TODO",
      payload: { id: uuidv4().slice(0, 4), title, completed: false },
    });
  };

  const toggleTodo = (id: string) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  };

  const deleteTodo = (id: string) => {
    dispatch({ type: "DELETE_TODO", payload: id });
  };

  const filterList = (filter: string) => {
    dispatch({ type: "FILTER_TODO_LIST", payload: filter });
  };

  return (
    <TodoContext.Provider
      value={{ TodoListArray, addTodo, toggleTodo, deleteTodo, filterList }}
    >
      {children}
    </TodoContext.Provider>
  );
};
