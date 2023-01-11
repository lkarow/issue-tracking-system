import React, { useState } from "react";
import CardItems from "./CardItems";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

type Prop = {
  tasks: Task[];
  columnTitle: string;
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

export default function BoardColumn({ tasks, columnTitle }: Prop) {
  const [isShowingModal, toggleModal] = useModal();
  const [titleOfNewTask, setTitleOfNewTask] = useState("");

  const handleCreateTask = () => {
    toggleModal();
  };

  const allowDrop = (e: any) => e.preventDefault();

  const drag = (e: any) => e.dataTransfer.setData("text", e.target.id);

  const drop = (e: any) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    const draggable = document.getElementById(data);
    e.target.appendChild(draggable);
  };

  return (
    <>
      <TaskModal
        showModal={isShowingModal}
        onClose={toggleModal}
        newTitle={titleOfNewTask}
      />

      <div className={styles.boardColumn}>
        <div className={styles.boardColumnTitle}>{columnTitle}</div>
        <div
          className={styles.boardColumnContainer}
          id={columnTitle}
          onDragEnd={(e: any) => drop(e)}
          onDrop={(e: any) => allowDrop(e)}
        >
          {tasks &&
            tasks.map((task: Task) => (
              <CardItems key={task._id} task={task} drag={drag} />
            ))}
          <div>
            <textarea
              className={styles.boardColumnTextarea}
              name="create-task"
              rows={2}
              placeholder="Create new task"
              value={titleOfNewTask}
              onChange={(e) => setTitleOfNewTask(e.target.value)}
            ></textarea>
            <button
              className={styles.boardColumnCreateTaskBtn}
              onClick={handleCreateTask}
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
