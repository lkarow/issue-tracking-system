import React, { useState, useEffect } from "react";
import styles from "../styles/TaskTable.module.css";
import TaskTableRow from "./TaskTableRow";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { FaSort } from "react-icons/fa";

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
  const [sortCategory, setSortCategory] = useState("Date");

  const [isShowingModal, toggleModal] = useModal();
  const [selectedTask, setSelectedTask] = useState({});

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    toggleModal();
  };

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
    <>
      <TaskModal
        task={selectedTask}
        showModal={isShowingModal}
        onClose={toggleModal}
      />

      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              Title
              <button
                className={styles.tableIconBtn}
                onClick={() => setSortCategory("Title")}
              >
                <FaSort className={styles.tableIcons} />
              </button>
            </th>
            <th>
              Author
              <button
                className={styles.tableIconBtn}
                onClick={() => setSortCategory("Author")}
              >
                <FaSort className={styles.tableIcons} />
              </button>
            </th>
            <th>
              Date
              <button
                className={styles.tableIconBtn}
                onClick={() => setSortCategory("Date")}
              >
                <FaSort className={styles.tableIcons} />
              </button>
            </th>
            <th>
              Status
              <button
                className={styles.tableIconBtn}
                onClick={() => setSortCategory("Status")}
              >
                <FaSort className={styles.tableIcons} />
              </button>
            </th>
            <th>
              Assignee
              <button
                className={styles.tableIconBtn}
                onClick={() => setSortCategory("Assignee")}
              >
                <FaSort className={styles.tableIcons} />
              </button>
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tasks &&
            tasks
              .sort((a: any, b: any) => {
                const sortA = a[sortCategory].toLowerCase();
                const sortB = b[sortCategory].toLowerCase();
                if (sortA < sortB) return -1;
                if (sortA > sortB) return 1;
                return 0;
              })
              .map((task: Task) => (
                <TaskTableRow
                  key={task._id}
                  task={task}
                  handleEdit={handleEdit}
                />
              ))}
        </tbody>
      </table>
    </>
  );
}
