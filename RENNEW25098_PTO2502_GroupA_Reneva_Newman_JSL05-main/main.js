import { loadTasks, saveTasks } from './js/storage.js';
import { setupModalCloseHandler, setupAddTaskModal } from './js/modal.js';
import { renderTasks, clearExistingTasks } from './js/render.js';
import { fetchTasksFromAPI } from './js/api.js';

function setStatusMessage(message) {
  const statusEl = document.getElementById("status-message");
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.style.display = message ? "block" : "none";
  }
}

async function init() {
  const spinner = document.getElementById("loading-spinner");
  const statusEl = document.getElementById("status-message");

  // Show spinner and loading message
  if (spinner) spinner.style.display = "block";
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
    if (spinner) spinner.style.display = "none";
    return;
  }

  // Hide spinner/message
  if (spinner) spinner.style.display = "none";
  setStatusMessage("");

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

  // Mobile logo toggle
  const mobileLogo = document.getElementById("mobile-logo-toggle");
  if (mobileLogo && sidebar) {
    mobileLogo.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle("mobile-active");
      }
    });
  }

  // Theme toggle
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
  }
});

