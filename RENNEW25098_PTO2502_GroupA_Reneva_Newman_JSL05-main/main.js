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
  const spinner = document.getElementById("loading-overlay");
  const statusEl = document.getElementById("status-message");

  // Show spinner and loading message
  if (spinner) spinner.style.display = "flex"; // Use "flex" for your CSS spinner
  setStatusMessage("Loading tasks...");

  let tasks = loadTasks();

  try {
    if (!tasks || tasks.length === 0) {
      tasks = await fetchTasksFromAPI();
      saveTasks(tasks);
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    // Use fallback test tasks so content renders
    tasks = [
      { id: 1, title: "Test Task 1", status: "todo", priority: "medium" },
      { id: 2, title: "Test Task 2", status: "doing", priority: "high" },
      { id: 3, title: "Test Task 3", status: "done", priority: "low" }
    ];
    setStatusMessage("Failed to fetch tasks; showing fallback tasks.");
  }

  // Hide spinner/message after short delay for UX
  setTimeout(() => {
    if (spinner) spinner.style.display = "none";
    setStatusMessage("");
  }, 300); // optional short delay for smoother transition

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
    sideBar.style.display = "none";
    showSidebarBtn.style.display = "block";
  });

  showSidebarBtn?.addEventListener("click", () => {
    sideBar.style.display = "flex";
    showSidebarBtn.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  init();
  setupSidebarToggle();
});

