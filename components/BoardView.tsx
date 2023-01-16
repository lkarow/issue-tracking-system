import React, { useState, useEffect } from "react";
import BoardColumn from "./BoardColumn";
import LoadingSpinner from "./LoadingSpinner";
import styles from "../styles/Board.module.css";

type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

export default function BoardView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      });
  }, []);

  const drag = (e: any, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    e.target.id = taskId;
    e.target.style.backgroundColor = "rgb(25, 145, 189)";
  };

  const allowDrop = (e: any) => {
    // Check if dropzone is a column of the board
    if (!e.target.id.match(/open|progress|review|done/)) return;
    e.preventDefault();
    const newStatus = e.target.id;
    drop(e, newStatus);
  };

  const drop = (e: any, newStatus: string) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    const dropzone = e.target;
    const draggedItem = document.getElementById(taskId);
    dropzone.appendChild(draggedItem);
    draggedItem.style.backgroundColor = "#fff";
    changeStatusOfTask(taskId, newStatus);
  };

  const changeStatusOfTask = async (taskId: string, newStatus: string) => {
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

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  if (loading) return <LoadingSpinner />;
  if (!tasks) return <div>No tasks data</div>;

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        <BoardColumn
          columnTitle="Backlog"
          status="open"
          tasks={tasks.filter((task: Task) => task.Status === "open")}
          handleDragOver={handleDragOver}
          allowDrop={allowDrop}
          drag={drag}
        />
        <BoardColumn
          columnTitle="In Progress"
          status="progress"
          tasks={tasks.filter((task: Task) => task.Status === "progress")}
          handleDragOver={handleDragOver}
          allowDrop={allowDrop}
          drag={drag}
        />
        <BoardColumn
          columnTitle="In Review"
          status="review"
          tasks={tasks.filter((task: Task) => task.Status === "review")}
          handleDragOver={handleDragOver}
          allowDrop={allowDrop}
          drag={drag}
        />
        <BoardColumn
          columnTitle="Done"
          status="done"
          tasks={tasks.filter((task: Task) => task.Status === "done")}
          handleDragOver={handleDragOver}
          allowDrop={allowDrop}
          drag={drag}
        />
      </div>
    </div>
  );
}
