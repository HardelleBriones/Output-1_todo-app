import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "../App";
import { fetchTasks, deleteTask, updateTaskStatus } from "../api/api";
import { MdOutlineDeleteForever } from "react-icons/md";
import DeleteModal from "./DeleteModal";
const TaskList = () => {
  const handleOnClickDone = async (id) => {
    try {
      const status = "Complete";
      await updateTaskStatus(id, status);

      toast.success("Task Completed");
    } catch (error) {
      console.log("error in deleting task", error);
    }
  };

  const darkTheme = useContext(ThemeContext);
  const [todo, setTodo] = useState([]);
  const [status, setStatus] = useState("InComplete"); // Default value
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const data = await fetchTasks();
        const orderData = data
          .filter((x) => x.status == status)
          .sort((a, b) => new Date(a.date) - new Date(b.date));
        setTodo(orderData);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchTodo();
  }, []);

  const handleChangeFilter = (event) => {
    //handle filter
    setStatus(event.target.value);
    const filterStatus = todo.filter((x) => x.status !== status);
    setTodo(filterStatus);
    console.log(event.target.value); // This will log the current value
  };
  const darkMode = () => {
    return darkTheme
      ? "flex flex-col items-center bg-gray-500 min-h-screen w-full"
      : "flex flex-col items-center bg-white min-h-screen w-full";
  };
  const [taskIdToDelete, setTaskIdToDelete] = useState(null);
  const [showFullNote, setShowFullNote] = useState(false);
  const maxLength = 100; // Define the character limit for truncation
  const toggleShowFullNote = () => {
    setShowFullNote(!showFullNote);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const handleOpenModal = (id) => {
    setTaskIdToDelete(id);
    setOpenDeleteModal(true);
  };
  const handleCloseModal = () => {
    setTaskIdToDelete(null);
    setOpenDeleteModal(false);
  };
  const handleDelete = async () => {
    console.log(taskIdToDelete);
    try {
      const filterDelete = todo.filter((x) => x.id !== taskIdToDelete);
      await deleteTask(taskIdToDelete);
      setTodo(filterDelete);
      setOpenDeleteModal(false);
      toast.warning("Task Deleted");
    } catch (error) {
      console.log("error in deleting task", error);
    }
  };
  return (
    <>
      <div className={darkMode()}>
        <div className="w-3/4 max-w-full ">
          <div className="w-3/4 max-w-full flex items-center">
            <h1 className="my-6 font-medium text-5xl mr-4 ">My Todo List</h1>

            <select
              id="status"
              className="ml-2 mt-4 border border-gray-300 rounded px-3 py-1"
              value={status}
              onChange={handleChangeFilter}
            >
              <option value="InComplete">InProgress</option>
              <option value="Complete">Completed</option>
            </select>
          </div>

          {todo.map((task) => (
            <div
              className="flex flex-row bg-gray-300 rounded-lg mb-4 hover:bg-blue-400"
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
                <div className="flex">
                  {status !== "Complete" && (
                    <FaCheckCircle
                      size={30}
                      className="text-green-400 transition duration-200 ease-in-out hover:text-green-600 cursor-pointer"
                      onClick={() => handleOnClickDone(task.id)}
                    />
                  )}

                  <MdOutlineDeleteForever
                    size={30}
                    onClick={() => handleOpenModal(task.id)}
                    className="text-red-400 transition duration-200 ease-in-out hover:text-red-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <DeleteModal open={openDeleteModal} onClose={handleCloseModal}>
            <div className="text-center w-56">
              <MdOutlineDeleteForever
                size={50}
                className="text-red-500 mx-auto"
              />
              <div className="mx-auto my-4 w-48">
                <h3 className="text-lg font-black text-gray-800">
                  Confirm delete
                </h3>
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete this item?
                </p>
                <div className="flex gap-4">
                  <button
                    className="btn btn-danger w-full"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-light w-full"
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </DeleteModal>
        </div>
      </div>
    </>
  );
};

export default TaskList;
