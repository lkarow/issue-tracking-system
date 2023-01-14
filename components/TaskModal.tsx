import React from "react";

import TaskCreate from "./TaskCreate";

type Prop = {
  task?: any;
  newTitle?: string;
  showModal: any;
  onClose: any;
};

type Task = {
  _id?: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

export default function TaskModal({
  task,
  newTitle,
  showModal,
  onClose,
}: Prop) {
  if (!showModal) return null;

  return (
    <div className="modalWrapper" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <TaskCreate task={task} newTitle={newTitle} onClose={onClose} />
        <button className="modalCloseButton" onClick={onClose}>
          &#x2715;
        </button>
      </div>
    </div>
  );
}
