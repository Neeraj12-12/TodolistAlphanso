import React from "react";
import TodoList from "./TodoList";

export const TodoComponent = () => {
  return (
    <div
    className="flex-col h-full w-full p-4 justify-center items-center"
    >
      <TodoList />
    </div>
  );
};
