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

document.addEventListener("DOMContentLoaded", () => {
  init();

  // Sidebar toggle functionality (desktop hide/show buttons)
const sidebar = document.getElementById("side-bar-div");
const hideBtn = document.getElementById("hide-sidebar-btn");
const showBtn = document.getElementById("show-sidebar-btn");

hideBtn.addEventListener("click", () => {
  sidebar.classList.add("sidebar-hidden");   // Hide sidebar by adding class
  showBtn.style.display = "block";            // Show 'show sidebar' button
});

showBtn.addEventListener("click", () => {
  sidebar.classList.remove("sidebar-hidden"); // Show sidebar by removing class
  showBtn.style.display = "none";              // Hide 'show sidebar' button
});


  // Mobile sidebar toggle on app logo click
  const mobileLogo = document.getElementById("mobile-logo-toggle");
  if (mobileLogo && sidebar) {
    mobileLogo.addEventListener("click", () => {
      sidebar.classList.toggle("mobile-active");
    });
  }
});

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

// On page load, apply saved theme or default to light
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "light";
  applyTheme(savedTheme);
});

// Toggle handler
themeToggleCheckbox.addEventListener("change", () => {
  if (themeToggleCheckbox.checked) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }
});


