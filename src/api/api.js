export const fetchTasks = async () => {
  const res = await fetch("/api/tasks/");
  const data = await res.json();
  return data;
};

export const deleteTask = async (id) => {
  await fetch(`/api/tasks/${id}/`, {
    method: "DELETE",
  });
  return;
};

export const addTask = async (newTask) => {
  await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  return;
};
