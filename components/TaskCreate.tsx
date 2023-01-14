import React, { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/TaskModal.module.css";

type Prop = {
  task?: any;
  newTitle?: string;
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

export default function TaskCreate({ task, newTitle, onClose }: Prop) {
  const [newTask, setNewTask] = useState<Task>(() => {
    if (task) {
      return {
        Title: task.Title || newTitle || "",
        Description: task.Title || "",
        Status: task.Title || "",
        Author: task.Title || "",
        Assignee: task.Title || "",
        Date: task.Title || "",
      };
    }
    if (newTitle) {
      return {
        Title: newTitle,
        Description: "",
        Status: "",
        Author: "",
        Assignee: "",
        Date: "",
      };
    }
    return {
      Title: "",
      Description: "",
      Status: "",
      Author: "",
      Assignee: "",
      Date: "",
    };
  });

  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const submitTask = async (e: any) => {
    e.preventDefault();

    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
  };

  const hanldeSubmit = async (e: any) => {
    await submitTask(e);
    onClose();
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/tasks/${task._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    onClose();
    router.reload();
  };

  return (
    <div className={styles.taskModalContainer}>
      <form className={styles.taskModalForm} onSubmit={(e) => hanldeSubmit(e)}>
        <div className={styles.taskModalFormColumn}>
          <label htmlFor="create-task-title">Title*</label>
          <input
            name="Title"
            id="create-task-title"
            className={styles.taskModalFormInput}
            type="text"
            placeholder="Title"
            value={newTask.Title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className={styles.taskModalFormColumn}>
          <label htmlFor="create-task-description">Description</label>
          <textarea
            name="Description"
            id="create-task-description"
            className={styles.taskModalFormInput}
            rows={2}
            value={newTask.Description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <div className={styles.taskModalFormRow}>
          <div className={styles.taskModalFormColumn}>
            <label htmlFor="create-task-status">Status*</label>
            <select
              name="Status"
              id="create-task-status"
              className={styles.taskModalFormInput}
              value={newTask.Status}
              onChange={(e) => handleChange(e)}
              required
            >
              <option value="">Please choose a status</option>
              <option value="open">Open</option>
              <option value="progress">In progress</option>
              <option value="review">Review</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className={styles.taskModalFormColumn}>
            <label htmlFor="create-task-date">Date</label>
            <input
              name="Date"
              id="create-task-date"
              className={styles.taskModalFormInput}
              type="date"
              value={newTask.Date}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className={styles.taskModalFormRow}>
          <div className={styles.taskModalFormColumn}>
            <label htmlFor="create-task-title">Assignee</label>
            <input
              name="Title"
              id="create-task-assignee"
              className={styles.taskModalFormInput}
              type="text"
              placeholder="Assignee"
              value={newTask.Assignee}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className={styles.taskModalFormColumn}>
            <label htmlFor="create-task-title">Author</label>
            <input
              name="Title"
              id="create-task-author"
              className={styles.taskModalFormInput}
              type="text"
              placeholder="Author"
              value={newTask.Author}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
        </div>
        <div className={styles.taskModalFormRow}>
          <div className={styles.taskModalFormColumn}>
            <input
              className={`${styles.taskModalBtn} ${styles.taskModalBtnSubmit}`}
              type="submit"
              value="Submit"
            />
          </div>
          <div className={styles.taskModalFormColumn}>
            <button
              className={`${styles.taskModalBtn} ${styles.taskModalBtnDelete}`}
              onClick={(e) => handleDelete(e)}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
