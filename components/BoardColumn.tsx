import React, { useState } from "react";
import CardItems from "./CardItems";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

type Prop = {
  tasks: Task[];
  columnTitle: string;
  status: string;
  handleDragOver: any;
  allowDrop: any;
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

export default function BoardColumn({
  tasks,
  columnTitle,
  handleDragOver,
  allowDrop,
  drag,
  status,
}: Prop) {
  const [isShowingModal, toggleModal] = useModal();
  const [titleOfNewTask, setTitleOfNewTask] = useState("");

  const handleCreateTask = () => {
    toggleModal();
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
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e: any) => allowDrop(e)}
          data-status={status}
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
