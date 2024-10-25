import React from "react";
import "./App.css";
import { TodoProvider } from "./components/context/Context";
import { TodoComponent } from "./components/TodoComponent";

function App() {
  return (
    <TodoProvider >
      <TodoComponent />
    </TodoProvider>
  );
}

export default App;
