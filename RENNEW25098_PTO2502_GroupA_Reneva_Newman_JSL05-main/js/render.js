// render.js

import { openTaskModal } from "./modal.js";

// Priority rank mapping: higher number = higher urgency
const priorityRank = {
  high: 3,
  medium: 2,
  low: 1
};

/**
 * Create a DOM element representing a single task.
 * @param {Object} task - Task object with id, title, status, and priority.
 * @returns {HTMLElement} The task's DOM element.
 */
function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-div";
  taskDiv.dataset.taskId = task.id;

  // Determine dot color based on priority
  let dotColor;
  switch (task.priority) {
    case "high":
      dotColor = "red";
      break;
    case "medium":
      dotColor = "orange";
      break;
    case "low":
    default:
      dotColor = "green";
  }

  // Flex layout: title left, dot right
  taskDiv.innerHTML = `
    <span class="task-title">${task.title}</span>
    <span class="priority-dot" style="background-color: ${dotColor};" title="${task.priority} priority"></span>
  `;

  taskDiv.addEventListener("click", () => openTaskModal(task));

  return taskDiv;
}

/**
 * Get the DOM container based on task status.
 * @param {string} status - Status of the task (todo, doing, done).
 * @returns {HTMLElement|null} DOM container or null if not found.
 */
function getTaskContainerByStatus(status) {
  const column = document.querySelector(`.column-div[data-status="${status}"]`);
  return column ? column.querySelector(".tasks-container") : null;
}

/**
 * Clear all existing tasks from UI.
 */
export function clearExistingTasks() {
  document.querySelectorAll(".tasks-container").forEach((container) => {
    container.innerHTML = "";
  });
}

/**
 * Render tasks in the UI.
 * @param {Array<Object>} tasks - List of task objects.
 */
export function renderTasks(tasks) {
  tasks.forEach((task) => {
    const container = getTaskContainerByStatus(task.status);
    if (container) {
      const taskElement = createTaskElement(task);
      container.appendChild(taskElement);
    }
  });
}
