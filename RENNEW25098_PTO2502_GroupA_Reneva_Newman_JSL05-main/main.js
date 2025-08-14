import { loadTasks, saveTasks } from './js/storage.js';
import { setupModalCloseHandler, setupAddTaskModal } from './js/modal.js';
import { renderTasks, clearExistingTasks } from './js/render.js';
import { fetchTasksFromAPI } from './js/api.js';

/**
 * Display a message in the overlay
 */
function setStatusMessage(message) {
  const statusEl = document.getElementById("status-message");
  if (statusEl) {
    statusEl.textContent = message;
  }
}

async function init() {
  const overlay = document.getElementById("loading-overlay");

  if (overlay) overlay.style.display = "flex";
  setStatusMessage("Loading tasks...");

  let tasks = loadTasks();

  try {
    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasks(tasks);
    }
  } catch (error) {
    console.error(error);
    setStatusMessage("Failed to load tasks.");
    if (overlay) overlay.style.display = "none";
    return;
  }

  clearExistingTasks();
  renderTasks(tasks);

  if (overlay) overlay.style.display = "none";

  setupModalCloseHandler();
  setupAddTaskModal();
}

document.addEventListener("DOMContentLoaded", () => {
  init();
});
