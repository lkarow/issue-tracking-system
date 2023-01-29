import React from "react";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { drag } from "../utils/dragAndDrop";

import { FaRegClock, FaRegUserCircle } from "react-icons/fa";

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

export default function CardItems({ task }: Prop) {
  const [isShowingModal, toggleModal] = useModal();

  const { data: session } = useSession();

  const handleEdit = () => {
    // Check if the user is logged in
    if (!session) return;
    toggleModal();
  };

  const handleDrag = (e: any, taskId: string) => {
    // Check if the user is logged in
    if (!session) return;
    drag(e, taskId);
  };

  return (
    <div
      className={`${styles.cardContainer} ${
        styles[`${task.Status}ColorHeader`]
      }`}
      draggable={session !== null}
      onDragStart={(e) => handleDrag(e, task._id)}
      onClick={handleEdit}
    >
      <TaskModal task={task} showModal={isShowingModal} onClose={toggleModal} />

      <div className={styles.cardTitle}>{task.Title}</div>
      {task.Date && (
        <div data-testid="card-date">
          <FaRegClock className={styles.cardIcons} /> {task.Date}
        </div>
      )}
      {task.Assignee && (
        <div data-testid="card-assignee">
          <FaRegUserCircle className={styles.cardIcons} /> {task.Assignee}
        </div>
      )}
    </div>
  );
}
