import React, { useContext } from "react";
import { iEachTask } from "./TodoList";
import { TodoContext } from "./context/Context";

const TodoCard = ({ key, data }: { key: String; data: iEachTask }) => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    return <div>no todo</div>;
  }
  const { toggleTodo, deleteTodo } = todoContext;

  return (
    <>
      <div
        className={`flex ${
          data.completed === true ? "bg-lime-200" : ""
        } justify-between items-center w-full  my-2 border-2 rounded-lg border-slate-500`}
      >
        <div className="flex-1 p-1" onClick={() => toggleTodo(data.id)}>
          <input type="checkbox" checked={data.completed} />
          {data.title}
        </div>
        <button
          className="font-medium pr-2 p-2"
          onClick={() => deleteTodo(data.id)}
        >
          X
        </button>
      </div>
    </>
  );
};

export default TodoCard;
