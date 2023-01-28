import React from "react";
import styles from "../styles/TaskTable.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { useSession } from "next-auth/react";

type Prop = {
  task: Task;
};

type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

export default function TaskTableRow({ task }: Prop) {
  const [isShowingModal, toggleModal] = useModal();

  const { data: session } = useSession();

  const handleEdit = () => {
    // Check if the user is logged in
    if (!session) return;
    toggleModal();
  };

  return (
    <>
      <TaskModal task={task} showModal={isShowingModal} onClose={toggleModal} />

      <tr className={styles.dataRow} onClick={handleEdit}>
        <td>{task.Title}</td>
        <td>{task.Author}</td>
        <td>{task.Date}</td>
        <td>
          <span className={`${styles.status} ${styles[`${task.Status}Bg`]}`}>
            {task.Status}
          </span>
        </td>
        <td>{task.Assignee}</td>
      </tr>
    </>
  );
}
