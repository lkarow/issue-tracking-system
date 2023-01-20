import React, { useState } from "react";
import CardItems from "./CardItems";

import styles from "../styles/Board.module.css";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { handleDragOver, drop } from "../utils/dragAndDrop";

type Prop = {
  tasks: Task[];
  columnTitle: string;
  status: string;
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

export default function BoardColumn({ tasks, columnTitle, status }: Prop) {
  const [isShowingModal, toggleModal] = useModal();
  const [titleOfNewTask, setTitleOfNewTask] = useState("");
  const [isShowingCreateTaskBtn, setIsShowingCreateTaskBtn] = useState(false);

  const handleFocusTextarea = (e) => {
    setIsShowingCreateTaskBtn(!isShowingCreateTaskBtn);
    setTitleOfNewTask(e.target.value);
  };

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
          id={status}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e: any) => drop(e, tasks)}
        >
          {tasks &&
            tasks
              .filter((task: Task) => task.Status === status)
              .map((task: Task) => <CardItems key={task._id} task={task} />)}
          <div>
            <textarea
              className={styles.boardColumnTextarea}
              name="create-task"
              rows={1}
              placeholder="+ Create new task"
              value={titleOfNewTask}
              onChange={(e) => handleFocusTextarea(e)}
            ></textarea>
            {titleOfNewTask && (
              <button
                className={styles.boardColumnCreateTaskBtn}
                onClick={handleCreateTask}
              >
                Create Task
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
