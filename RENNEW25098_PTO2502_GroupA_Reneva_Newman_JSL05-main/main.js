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

  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");
  const logo = document.getElementById("logo");
  const mobileLogo = document.getElementById("mobile-logo-toggle");

  // Create mobile close button dynamically if not present
  let closeBtn = sidebar.querySelector(".close-mini-btn");
  if (!closeBtn) {
    closeBtn = document.createElement("button");
    closeBtn.className = "close-mini-btn";
    closeBtn.textContent = "×";
    sidebar.prepend(closeBtn);
  }

  // -----------------------
  // Desktop sidebar toggle (mini)
  // -----------------------
  if (logo && sidebar) {
    logo.addEventListener("click", () => {
      if (window.innerWidth > 768) {
        sidebar.classList.toggle("mini"); // collapse/expand sidebar
      }
    });
  }

  // -----------------------
  // Sidebar hide/show buttons (desktop)
  // -----------------------
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

  // -----------------------
  // Mobile sidebar toggle
  // -----------------------
  if (mobileLogo && sidebar) {
    mobileLogo.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.add("mobile-active"); // show fullscreen sidebar
      }
    });
  }

  // -----------------------
  // Mobile sidebar close button
  // -----------------------
  if (closeBtn && sidebar) {
    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("mobile-active");
    });
  }

  // -----------------------
  // DARK MODE FUNCTIONALITY
  // -----------------------
  const themeToggleCheckbox = document.getElementById("theme-toggle-checkbox");

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-theme");
      if (themeToggleCheckbox) themeToggleCheckbox.checked = true;
    } else {
      document.body.classList.remove("dark-theme");
      if (themeToggleCheckbox) themeToggleCheckbox.checked = false;
    }
    localStorage.setItem("theme", theme);
  }

  if (themeToggleCheckbox) {
    // Apply saved theme immediately
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Toggle event listener
    themeToggleCheckbox.addEventListener("change", () => {
      applyTheme(themeToggleCheckbox.checked ? "dark" : "light");
    });
  } else {
    console.warn("Theme toggle checkbox not found");
  }

  // -----------------------
  // Ensure sidebar buttons fixed at bottom
  // -----------------------
  const sidebarControls = document.querySelector("#side-bar-div .sidebar-controls");
  if (sidebarControls) {
    sidebarControls.style.position = "absolute";
    sidebarControls.style.bottom = "20px";
    sidebarControls.style.width = "100%";
  }
});

