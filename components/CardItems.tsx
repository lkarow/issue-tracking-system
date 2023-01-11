import React from "react";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

type Prop = {
  task: Task;
  drag: any;
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

export default function CardItems({ task, drag }: Prop) {
  const [isShowingModal, toggleModal] = useModal();

  const handleEdit = () => {
    toggleModal();
  };

  return (
    <div
      className={styles.cardContainer}
      draggable
      onDragStart={(e) => drag(e)}
    >
      <TaskModal task={task} showModal={isShowingModal} onClose={toggleModal} />

      <div className={styles.cardTitle}>{task.Title}</div>
      <div>{task.Date}</div>
      <div>{task.Assignee}</div>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
