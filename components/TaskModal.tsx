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
        <div className="modalBody">
          <TaskCreate task={task} newTitle={newTitle} onClose={onClose} />
        </div>
        <div className="modalFooter">
          <button className="modalCloseButton" onClick={onClose}>
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
}
