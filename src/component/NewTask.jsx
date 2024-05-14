import React from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThemeContext } from "../App";
import { addTask } from "../api/api";
const NewTask = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState("");

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleOnSubmit = async () => {
    if (task.trim() === "") {
      alert("Task name cannot be empty");
      return; // Do not proceed with submission if task name is empty
    }
    const newTask = {
      task,
      note,
      date,
    };
    try {
      await addTask(newTask);
    return navigate("/");
    } catch (error) {
      console.log("error adding task", error);
    }
  };
  const darkTheme = useContext(ThemeContext);

  const darkMode = () => {
    return darkTheme ? "bg-gray-500 h-screen" : "bg-indigo-500 h-screen";
  };
  return (
    <>
      <div className={darkMode()}>
        <div className="  flex justify-center items-center">
          <div className="w-130 p-6 mt-6  bg-blue-300 rounded-md ">
            <h1>Add New Task</h1>
            <hr className="mt-3" />
            <div className="mt-3">
              <label className="block text-base mb-2">Task Name </label>
              <input
                type="text"
                value={task}
                onChange={handleTaskChange}
                className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                placeholder="Enter Task"
                required
              />
            </div>

            <div>
              <br />
              <label htmlFor="">Note </label> <br />
              <textarea
                value={note}
                onChange={handleNoteChange}
                className="resize-none border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                cols="50"
                rows="10"
              ></textarea>
            </div>
            <br />
            <div>
              <label>Due Date: </label>
              <input
                type="date"
                value={date}
                onChange={handleDateChange}
                className=" px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
              />
            </div>
            <br />
            <div className="flex justify-center mt-5">
              <button
                className=" bg-indigo-700 text-white py-1 px-5"
                onClick={handleOnSubmit}
                type="submit"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewTask;
