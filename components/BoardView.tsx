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

  if (loading) return <LoadingSpinner />;
  if (!tasks) return <div>No tasks data</div>;

  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        <BoardColumn columnTitle="Backlog" status="open" tasks={tasks} />
        <BoardColumn
          columnTitle="In Progress"
          status="progress"
          tasks={tasks}
        />
        <BoardColumn columnTitle="In Review" status="review" tasks={tasks} />
        <BoardColumn columnTitle="Done" status="done" tasks={tasks} />
      </div>
    </div>
  );
}
