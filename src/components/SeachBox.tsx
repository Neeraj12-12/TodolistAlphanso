import React, { useCallback, useEffect, useState } from "react";
import { iEachTask } from "./TodoList";

interface SearchBoxProps {
  todoList: iEachTask[];
  onSearchResults: (filtered: iEachTask[]) => void;
  setLoading: (isLoading: boolean) => void;
}

const SearchBox = ({ todoList, onSearchResults, setLoading }: SearchBoxProps) => {
  const [searchInput, setSearchInput] = useState("");
  const [filter, setFilter] = useState("All");

  const debouncedSearch = useCallback(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      let filteredList = todoList;

      if (searchInput) {
        filteredList = filteredList.filter((task) =>
          task.title.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      if (filter === "Completed") {
        filteredList = filteredList.filter((task) => task.completed);
      } else if (filter === "Incomplete") {
        filteredList = filteredList.filter((task) => !task.completed);
      }

      onSearchResults(filteredList);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchInput, filter, todoList, onSearchResults, setLoading]);


  useEffect(() => {
    if (searchInput.trim()) {
      debouncedSearch();
    } else {
      onSearchResults(todoList); 
    }
  }, [searchInput, debouncedSearch, onSearchResults, todoList]);

  useEffect(() => {
    let filteredList = todoList;

    if (filter === "Completed") {
      filteredList = todoList.filter((task) => task.completed);
    } else if (filter === "Incomplete") {
      filteredList = todoList.filter((task) => !task.completed);
    }

    onSearchResults(filteredList);
  }, [filter, todoList, onSearchResults]);

  return (
    <div className="flex justify-center flex-col md:flex-row">
      <div className="font-bold text-3xl my-2">Today</div>
      <form className="w-full my-2 md:mx-4">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search..."
          />
        </div>
      </form>
      <div className="flex flex-row md:justify-center md:self-center">
        <button
          onClick={() => setFilter("All")}
          className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-1 text-center me-2 mb-2 ${
            filter === "All" ? "ring-2 ring-blue-300" : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
            filter === "Completed" ? "ring-2 ring-blue-300" : ""
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("Incomplete")}
          className={`text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${
            filter === "Incomplete" ? "ring-2 ring-blue-300" : ""
          }`}
        >
          Incomplete
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
