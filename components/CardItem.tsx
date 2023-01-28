import React from "react";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { drag } from "../utils/dragAndDrop";

import { FaRegClock, FaRegUserCircle } from "react-icons/fa";

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

  const handleEdit = () => {
    toggleModal();
  };

  return (
    <div
      className={`${styles.cardContainer} ${
        styles[`${task.Status}ColorHeader`]
      }`}
      draggable
      onDragStart={(e) => drag(e, task._id)}
      onClick={handleEdit}
    >
      <TaskModal task={task} showModal={isShowingModal} onClose={toggleModal} />

      <div className={styles.cardTitle}>{task.Title}</div>
      <div>
        <FaRegClock className={styles.cardIcons} /> {task.Date}
      </div>
      <div>
        <FaRegUserCircle className={styles.cardIcons} /> {task.Assignee}
      </div>
    </div>
  );
}
