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

  // Sidebar toggle functionality
  const sidebar = document.getElementById("side-bar-div");
  const hideBtn = document.getElementById("hide-sidebar-btn");
  const showBtn = document.getElementById("show-sidebar-btn");

  hideBtn.addEventListener("click", () => {
    sidebar.style.display = "none";     // Hide sidebar
    showBtn.style.display = "block";    // Show googly eyes tab
  });

  showBtn.addEventListener("click", () => {
    sidebar.style.display = "flex";     // Show sidebar as flex (important!)
    showBtn.style.display = "none";     // Hide googly eyes tab
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const logoMobile = document.querySelector('.logo-mobile');
  const sideBar = document.querySelector('.side-bar');

  logoMobile.addEventListener('click', () => {
    if (sideBar.classList.contains('hide')) {
      sideBar.classList.remove('hide');
    } else {
      sideBar.classList.add('hide');
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.querySelector(".side-bar");
  const mobileLogo = document.getElementById("mobile-logo-toggle");

  mobileLogo.addEventListener("click", () => {
    sidebar.classList.toggle("mobile-active");
  });
});


