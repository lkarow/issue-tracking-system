import React, { useState, useEffect } from "react";
import styles from "../styles/TaskTable.module.css";
import TaskTableRow from "./TaskTableRow";
import LoadingSpinner from "./LoadingSpinner";

import useModal from "../hooks/useModal";
import TaskModal from "./TaskModal";

import { FaSort, FaPlus } from "react-icons/fa";

import { useSession } from "next-auth/react";

type Task = {
  _id: string;
  Title: string;
  Description: string;
  Status: string;
  Author: string;
  Assignee: string;
  Date: string;
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortCategory, setSortCategory] = useState("Date");
  const [sortReverse, setSortReverse] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isShowingModal, toggleModal] = useModal();

  const { data: session } = useSession();

  const handleCreateTask = () => {
    // Check if the user is logged in
    if (!session) return;
    toggleModal();
  };

  const handleSortCategory = (e: any, category: string) => {
    // Remove active class from other icons
    document
      .querySelector(`.${styles.tableActiveSortIcon}`)
      ?.classList.remove(`${styles.tableActiveSortIcon}`);
    // Add active class to clicked icon
    e.target.classList.add(styles.tableActiveSortIcon);
    setSortCategory(category);
    if (sortCategory === category) setSortReverse(!sortReverse);
    if (sortCategory !== category) setSortReverse(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch("/api/tasks")
        .then((res) => res.json())
        .then((data) => {
          setTasks(data);
        });
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (!tasks) return <div>No tasks data</div>;

  return (
    <>
      <TaskModal showModal={isShowingModal} onClose={toggleModal} />

      <div className={styles.tableContainer}>
        <form className={styles.tableFilterForm}>
          <fieldset>
            <label htmlFor="search-input">Search: </label>
            <input
              id="search-input"
              type="text"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <label htmlFor="filter-status">Status: </label>
            <select
              name="filter"
              id="filter-status"
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="open">Open</option>
              <option value="progress">In progress</option>
              <option value="review">In review</option>
              <option value="done">Done</option>
            </select>
          </fieldset>
        </form>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                Title
                <button
                  className={styles.tableIconBtn}
                  onClick={(e) => handleSortCategory(e, "Title")}
                  aria-label={"Sort"}
                >
                  <FaSort className={styles.tableIcons} />
                </button>
              </th>
              <th>
                Author
                <button
                  className={styles.tableIconBtn}
                  onClick={(e) => handleSortCategory(e, "Author")}
                  aria-label={"Sort"}
                >
                  <FaSort className={styles.tableIcons} />
                </button>
              </th>
              <th>
                Date
                <button
                  className={styles.tableIconBtn}
                  onClick={(e) => handleSortCategory(e, "Date")}
                  aria-label={"Sort"}
                >
                  <FaSort className={styles.tableIcons} />
                </button>
              </th>
              <th>
                Status
                <button
                  className={styles.tableIconBtn}
                  onClick={(e) => handleSortCategory(e, "Status")}
                  aria-label={"Sort"}
                >
                  <FaSort className={styles.tableIcons} />
                </button>
              </th>
              <th>
                Assignee
                <button
                  className={styles.tableIconBtn}
                  onClick={(e) => handleSortCategory(e, "Assignee")}
                  aria-label={"Sort"}
                >
                  <FaSort className={styles.tableIcons} />
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                colSpan={6}
                className={
                  session
                    ? styles.tableCreateNewTask
                    : `${styles.tableCreateNewTask} ${styles.tableCreateNewTaskDisabled}`
                }
                onClick={handleCreateTask}
              >
                <FaPlus className={styles.tableIcons} /> Create Task
              </td>
            </tr>
            {tasks &&
              tasks
                .filter((task) => {
                  if (filterStatus === "all") return true;
                  return task.Status === filterStatus;
                })
                // Sort tasks by date by default
                .sort((a: any, b: any) => {
                  const sortA = a.Date.toLowerCase();
                  const sortB = b.Date.toLowerCase();
                  if (sortA < sortB) return -1;
                  if (sortA > sortB) return 1;
                  return 0;
                })
                .filter((task) => {
                  if (searchQuery === "") return true;
                  return (
                    task.Title.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    task.Author.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    ) ||
                    task.Assignee.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                  );
                })
                .sort((a: any, b: any) => {
                  const sortA = a[sortCategory].toLowerCase();
                  const sortB = b[sortCategory].toLowerCase();
                  if (sortReverse) {
                    if (sortA > sortB) return -1;
                    if (sortA < sortB) return 1;
                  }
                  if (sortA < sortB) return -1;
                  if (sortA > sortB) return 1;
                  return 0;
                })
                .map((task: Task) => (
                  <TaskTableRow key={task._id} task={task} />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
