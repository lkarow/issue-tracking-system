import React, { useState, useEffect } from "react";
import styles from "../styles/TaskTable.module.css";
import TaskView from "./TaskTableColumn";

type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

export default function TaskList() {
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
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Date</th>
          <th>Status</th>
          <th>Assignee</th>
        </tr>
      </thead>
      <tbody>
        {tasks &&
          tasks.map((task: Task) => <TaskView key={task._id} task={task} />)}
      </tbody>
    </table>
  );
}
