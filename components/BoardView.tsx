import React, { useState, useEffect } from "react";
import BoardColumn from "./BoardColumn";
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

  if (loading) return <div>Is loading ...</div>;
  if (!tasks) return <div>No tasks data</div>;

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        <BoardColumn
          columnTitle="Backlog"
          tasks={tasks.filter((task: Task) => task.Status === "open")}
        />
        <BoardColumn
          columnTitle="In Progress"
          tasks={tasks.filter((task: Task) => task.Status === "progress")}
        />
        <BoardColumn
          columnTitle="Review"
          tasks={tasks.filter((task: Task) => task.Status === "review")}
        />
        <BoardColumn
          columnTitle="Done"
          tasks={tasks.filter((task: Task) => task.Status === "done")}
        />
      </div>
    </div>
  );
}
