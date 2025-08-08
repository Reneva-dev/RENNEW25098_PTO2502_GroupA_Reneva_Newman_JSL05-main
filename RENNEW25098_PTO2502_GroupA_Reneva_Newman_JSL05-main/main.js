import { loadTasks, saveTasks } from './js/storage.js';
import { setupModalCloseHandler, setupAddTaskModal } from './js/modal.js';
import { renderTasks, clearExistingTasks } from './js/render.js';
import { fetchTasksFromAPI } from './js/api.js';

/**
 * Display a message in the status message div.
 * @param {string} message - Message to show.
 */
function setStatusMessage(message) {
  const statusEl = document.getElementById("status-message");
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.display = message ? "block" : "none";
  }
}

/**
 * Initialize the Kanban board with data.
 */
async function init() {
  setStatusMessage("Loading tasks...");

  let tasks = loadTasks();

  if (!tasks || tasks.length === 0) {
    try {
      tasks = await fetchTasksFromAPI();
      saveTasks(tasks);
      setStatusMessage("");
    } catch (error) {
      setStatusMessage("Error fetching tasks.");
      return;
    }
  } else {
    setStatusMessage("");
  }

  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupAddTaskModal();
}

document.addEventListener("DOMContentLoaded", init);


