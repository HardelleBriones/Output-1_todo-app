import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { fetchTasks, deleteTask } from "../api/api";

const TaskList = () => {
  const handleOnClickDone = (id) => {
    try {
      deleteTask(id);

      toast.success("Task Completed");
    } catch (error) {
      console.log("error in deleting task", error);
    }
  };

  const darkTheme = useContext(ThemeContext);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await fetchTasks();
        const orderData = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setTodo(orderData);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchTodo();
  }, [todo]);

  const darkMode = () => {
    return darkTheme
      ? "flex flex-col items-center bg-gray-500 max-h-full"
      : "flex flex-col items-center bg-white max-h-full";
  };

  return (
    <>
      <div className={darkMode()}>
        <div className="w-3/4">
          <h1 className="my-6 font-medium text-5xl">Todo Items</h1>
          <div>
            {todo.map((task) => (
              <div
                className="flex flex-row bg-gray-200 rounded-lg mb-4 hover:bg-blue-400"
                key={task.id}
              >
                <div className="w-60 px-6 py-4">{task.task}</div>
                <div className="w-2/3 py-4 px-6">
                  <p className="text-gray-800">{task.description}</p>
                </div>
                <div className="w-1/6 px-6 py-4 text-center">
                  <p className="text-gray-800">{task.date}</p>
                </div>
                <div className="w-1/6 px-6 py-4 flex justify-center">
                  <FaCheckCircle
                    size={30}
                    className="text-green-400 transition duration-200 ease-in-out hover:text-green-600 cursor-pointer"
                    onClick={() => handleOnClickDone(task.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
