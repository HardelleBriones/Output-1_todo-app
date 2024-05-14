import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { fetchTasks, deleteTask } from "../api/api";
import relax from "../assets/relax.jpg";
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
      ? "flex flex-col items-center bg-gray-500 min-h-screen w-full"
      : "flex flex-col items-center bg-white min-h-screen w-full";
  };
  const [showFullNote, setShowFullNote] = useState(false);
  const maxLength = 100; // Define the character limit for truncation
  const toggleShowFullNote = () => {
    setShowFullNote(!showFullNote);
  };
  return (
    <>
      <div className={darkMode()}>
        <div className="w-3/4 max-w-full ">
          <h1 className="my-6 font-medium text-5xl">Todo Items:</h1>
          {todo.map((task) => (
            <div
              className="flex flex-row bg-gray-200 rounded-lg mb-4 hover:bg-blue-400"
              key={task.id}
            >
              <div className="w-1/4 px-6 py-4">{task.task}</div>
              <div className="w-1/2 px-6 py-4 break-words">
                <p className="text-gray-800">
                  {showFullNote || task.note.length <= maxLength
                    ? task.note
                    : `${task.note.substring(0, maxLength)}...`}
                </p>
                {task.note.length > maxLength && (
                  <button
                    className="text-indigo-600 hover:text-indigo-800 mt-2 focus:outline-none focus:underline"
                    onClick={toggleShowFullNote}
                  >
                    {showFullNote ? "Show less" : "Show more"}
                  </button>
                )}
              </div>
              <div className="w-1/6 px-6 py-4 text-center">
                <p className="text-gray-800">{task.date}</p>
              </div>
              <div className="w-1/12 px-6 py-4 flex justify-center">
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
    </>
  );
};

export default TaskList;
