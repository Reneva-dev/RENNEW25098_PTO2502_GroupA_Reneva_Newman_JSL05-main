// modal.js

import { loadTasks, saveTasks } from "./storage.js";
import { clearExistingTasks, renderTasks } from "./render.js";

let currentTaskId = null;

/**
 * Open the modal and populate with task data for editing.
 * @param {Object} task - Task object to edit.
 */
export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const submitBtn = document.getElementById("submit-task-btn");
  const deleteBtn = document.getElementById("delete-task-btn");
 
titleInput.value = task.title;
  descInput.value = task.description;
  statusSelect.value = task.status;
  if (submitBtn) submitBtn.textContent = "Update Task";

  currentTaskId = task.id;

  // ✅ Show the delete button when editing a task
  if (deleteBtn) deleteBtn.style.display = "block";

  modal.showModal();
}

const deleteBtn = document.getElementById("delete-task-btn");
if (deleteBtn) {
  deleteBtn.onclick = () => {
    deleteTask(currentTaskId);
    modal.close();
    clearExistingTasks();
    renderTasks(loadTasks());
    currentTaskId = null;
  };
}


/**
 * Set up modal close event.
 */
export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.addEventListener("click", () => modal.close());
}

/**
 * Set up modal and form submission logic.
 */
export function setupAddTaskModal() {
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskForm = document.getElementById("task-form");

  addTaskBtn.addEventListener("click", () => {
    currentTaskId = null;
    taskForm.reset();

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-status").value = "todo";

    const submitBtn = document.getElementById("submit-task-btn");
    if (submitBtn) submitBtn.textContent = "Create Task";

      const deleteBtn = document.getElementById("delete-task-btn");

  // Hide delete button for new tasks
  deleteBtn.style.display = currentTaskId ? "block" : "none";

  deleteBtn.addEventListener("click", () => {
    if (!currentTaskId) return;

    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    let tasks = loadTasks();
    tasks = tasks.filter((task) => task.id !== currentTaskId);
    saveTasks(tasks);

    document.getElementById("task-modal").close();
    clearExistingTasks();
    renderTasks(loadTasks());
    currentTaskId = null;
  });

    document.getElementById("task-modal").showModal();
  });

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-desc").value.trim();
    const status = document.getElementById("task-status").value;
    if (!title || !status) return;

    const tasks = loadTasks();

    if (currentTaskId !== null) {
      const taskIndex = tasks.findIndex((t) => t.id === currentTaskId);
      if (taskIndex !== -1) {
        tasks[taskIndex].title = title;
        tasks[taskIndex].description = description;
        tasks[taskIndex].status = status;
      }
    } else {
      const newTask = {
        id: Date.now(),
        title,
        description,
        status,
      };
      tasks.push(newTask);
    }

    saveTasks(tasks);
    document.getElementById("task-modal").close();
    clearExistingTasks();
    renderTasks(loadTasks());
    currentTaskId = null;
  });
}
