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
 * Show a loading spinner or text while fetching tasks.
 */
function showLoadingState() {
  setStatusMessage("Loading tasks...");
}

/**
 * Hide loading state once tasks are ready.
 */
function hideLoadingState() {
  setStatusMessage("");
}

/**
 * Initialize the Kanban board with data from API or localStorage.
 */
async function init() {
  const spinner = document.getElementById("loading-spinner");
  const statusEl = document.getElementById("status-message");

  // Show spinner and loading message
  spinner.style.display = "flex";
  statusEl.textContent = "Loading tasks...";
  statusEl.style.display = "block";

  let tasks = loadTasks();

  if (!tasks || tasks.length === 0) {
    try {
      tasks = await fetchTasksFromAPI(); // Spinner is visible during this fetch
      saveTasks(tasks);
    } catch (error) {
      statusEl.textContent = "Error fetching tasks.";
      spinner.style.display = "none";
      return;
    }
  }

  // Hide spinner and clear message once tasks are ready
  spinner.style.display = "none";
  statusEl.textContent = "";
  statusEl.style.display = "none";

  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupAddTaskModal();
}


document.addEventListener("DOMContentLoaded", () => {
  init();

  // Sidebar toggle functionality
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");

  if (hideBtn && showBtn && sidebar) {
    hideBtn.addEventListener("click", () => {
      sidebar.style.display = "none";
      showBtn.style.display = "block";
    });
    showBtn.addEventListener("click", () => {
      sidebar.style.display = "flex";
      showBtn.style.display = "none";
    });
  }

  // Mobile sidebar toggle on logo click
  const mobileLogo = document.getElementById("mobile-logo-toggle");
  if (mobileLogo && sidebar) {
    mobileLogo.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("mobile-active");
      }
    });
  }

  // DARK MODE FUNCTIONALITY
  const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggleCheckbox.checked = true;
    } else {
      document.body.classList.remove("dark-theme");
      themeToggleCheckbox.checked = false;
    }
    localStorage.setItem("theme", theme);
  }

  if (themeToggleCheckbox) {
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    themeToggleCheckbox.addEventListener("change", () => {
      applyTheme(themeToggleCheckbox.checked ? "dark" : "light");
    });
  } else {
    console.warn("Theme toggle checkbox not found");
  }
});
