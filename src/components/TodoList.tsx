import React, { useContext, useRef, useState } from "react";
import { TodoContext } from "./context/Context";
import TodoCard from "./TodoCard";
import { TodoForm } from "./TodoForm";
import SearchBox from "./SeachBox";

export interface iEachTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface iForm {
  openForm: () => void;
}

const TodoList = () => {
  const [filteredList, setFilteredList] = useState<iEachTask[]>([]);
  const [loading, setLoading] = useState(false);
  const todoContext = useContext(TodoContext);
  const formRef = useRef<iForm | null>(null);

  if (!todoContext) {
    return <div>No todos available</div>;
  }

  const { TodoListArray } = todoContext;

  return (
    <>
      <SearchBox todoList={TodoListArray} onSearchResults={setFilteredList} setLoading={setLoading} />
      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          {loading ? (
            <button className="loading-button">Loading...</button>
          ) : filteredList.length > 0 ? (
            filteredList.map((eachTodo: iEachTask) => (
              <TodoCard key={eachTodo.id} data={eachTodo} />
            ))
          ) : (
            <div>No Todo task for Today</div>
          )}
        </div>
        <TodoForm ref={formRef} />
        <button
          onClick={() => formRef?.current?.openForm?.()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Add New Todo Task
        </button>
      </div>
    </>
  );
};

export default TodoList;
