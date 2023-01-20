import React from "react";

import TaskForm from "./TaskForm";

type Prop = {
  task?: Task;
  newTitle?: string;
  newStatus?: string;
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
  newStatus,
  showModal,
  onClose,
}: Prop) {
  if (!showModal) return null;

  return (
    <div className="modalWrapper" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <TaskForm
          task={task}
          newTitle={newTitle}
          newStatus={newStatus}
          onClose={onClose}
        />
        <button className="modalCloseButton" onClick={onClose}>
          &#x2715;
        </button>
      </div>
    </div>
  );
}
