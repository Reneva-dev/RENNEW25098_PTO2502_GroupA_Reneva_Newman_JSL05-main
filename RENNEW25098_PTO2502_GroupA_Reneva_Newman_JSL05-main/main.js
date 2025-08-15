// main.js
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

  // Show overlay and loading message
  if (overlay) overlay.style.display = "flex"; 
  setStatusMessage("Loading tasks...");

  let tasks = loadTasks();

  try {
    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasks(tasks);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);

    // Fallback tasks if API fails
    tasks = [
      { id: 1, title: "Test Task 1", status: "todo", priority: "medium" },
      { id: 2, title: "Test Task 2", status: "doing", priority: "high" },
      { id: 3, title: "Test Task 3", status: "done", priority: "low" }
    ];

    setStatusMessage("Failed to fetch tasks; showing fallback tasks.");
  }

  // Hide overlay and clear status message after a short delay
  setTimeout(() => {
    if (overlay) overlay.style.display = "none";
    setStatusMessage("");
  }, 300);

  // Render tasks and setup modals
  clearExistingTasks();
  renderTasks(tasks);
  setupModalCloseHandler();
  setupAddTaskModal();

  // Initialize dark mode from localStorage
  const themeCheckbox = document.getElementById("theme-toggle-checkbox");
  const darkModeSaved = localStorage.getItem("darkMode") === "on";
  if (darkModeSaved) {
    document.body.classList.add("dark-theme");
    if (themeCheckbox) themeCheckbox.checked = true;
  }

  // Dark mode toggle listener
  themeCheckbox?.addEventListener("change", (e) => {
    const isDark = e.target.checked;
    document.body.classList.toggle("dark-theme", isDark);
    localStorage.setItem("darkMode", isDark ? "on" : "off");
  });
}

// Sidebar toggle logic
function setupSidebarToggle() {
  const hideSidebarBtn = document.getElementById("hide-sidebar-btn");
  const sideBar = document.getElementById("side-bar-div");
  const showSidebarBtn = document.getElementById("show-sidebar-btn");

  hideSidebarBtn?.addEventListener("click", () => {
    if (sideBar) sideBar.style.display = "none";
    if (showSidebarBtn) showSidebarBtn.style.display = "block";
  });

  showSidebarBtn?.addEventListener("click", () => {
    if (sideBar) sideBar.style.display = "flex";
    if (showSidebarBtn) showSidebarBtn.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  setupSidebarToggle();
});
