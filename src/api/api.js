export const fetchTasks = async () => {
  const res = await fetch(
    "https://my-json-server.typicode.com/HardelleBriones/backend-json-server/tasks"
  );
  const data = await res.json();
  return data;
};

export const deleteTask = async (id) => {
  await fetch(
    `https://my-json-server.typicode.com/HardelleBriones/backend-json-server/tasks/${id}`,
    {
      method: "DELETE",
    }
  );
  return;
};

export const addTask = async (newTask) => {
  const data = await fetch(
    "https://my-json-server.typicode.com/HardelleBriones/backend-json-server/tasks/",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    }
  );
  return;
};

export const updateTaskStatus = async (id, newStatus) => {
  // Fetch the current task data
  const response = await fetch(
    `https://my-json-server.typicode.com/HardelleBriones/backend-json-server/tasks/${id}`
  );
  const task = await response.json();

  // Update the status field
  task.status = newStatus;

  // Send the updated task data back to the server
  await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return;
};
