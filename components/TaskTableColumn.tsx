import React from "react";
import styles from "../styles/TaskTable.module.css";

import { FaRegSun } from "react-icons/fa";

type Prop = {
  task: Task;
};

type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author?: string;
  Assignee?: string;
  Date?: string;
};

export default function TaskTableColumn({ task }: Prop) {
  return (
    <tr>
      <td>{task.Title}</td>
      <td>{task.Author}</td>
      <td>{task.Date}</td>
      <td>
        <span className={styles.status}>{task.Status}</span>
      </td>
      <td>{task.Assignee}</td>
      <td>
        <button className={styles.tableIconBtn}>
          <FaRegSun className={styles.tableIcons} />
        </button>
      </td>
    </tr>
  );
}
