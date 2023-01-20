type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

const handleDragOver = (e: any) => {
  e.preventDefault();
};

const drag = (e: any, taskId: string) => {
  e.dataTransfer.setData("taskId", taskId);
  // Set the ID of the element to taskId for future reference
  e.target.id = taskId;
};

const allowDropInColumn = (e: any) => {
  // Check if dropzone is a column of the board
  return e.target.id.match(/open|progress|review|done/) ? true : false;
};

const drop = (e: any, tasks: Task[]) => {
  e.preventDefault();
  if (!allowDropInColumn(e)) return;
  const taskId = e.dataTransfer.getData("taskId");
  const dropzone = e.target;
  const newStatus = e.target.id;
  const draggedItem = document.getElementById(taskId);
  dropzone.appendChild(draggedItem);
  changeStatusOfTask(tasks, taskId, newStatus);
};

const changeStatusOfTask = async (
  tasks: Task[],
  taskId: string,
  newStatus: string
) => {
  const taskToChange = tasks.filter((task) => task._id === taskId)[0];
  await fetch(`/api/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Title: taskToChange.Title,
      Description: taskToChange.Description,
      Status: newStatus,
      Author: taskToChange.Author,
      Assignee: taskToChange.Assignee,
      Date: taskToChange.Date,
    }),
  });
};

export { handleDragOver, drag, drop };
