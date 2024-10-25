import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useState,
} from "react";
import { TodoContext } from "./context/Context";

export const TodoForm = forwardRef((props, ref) => {
  const [input, setInput] = useState("");
  const context = useContext(TodoContext);
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return {
        openForm: () => setIsOpen(true),
      };
    },
    []
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full">
     
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow dark:bg-gray-700 z-10">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                Add New Todo Task
              </h3>
              <form
                onSubmit={() => {
                  context?.addTodo(input);
                  setInput("");
                  setIsOpen(false);
                }}
              >
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Title"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="flex justify-center items-center mt-6 space-x-4 rtl:space-x-reverse">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
