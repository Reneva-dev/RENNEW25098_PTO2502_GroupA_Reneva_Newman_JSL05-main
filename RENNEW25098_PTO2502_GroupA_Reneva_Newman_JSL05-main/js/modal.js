// modal.js
import { loadTasks, saveTasks, deleteTask } from "./storage.js";
import { clearExistingTasks, renderTasks } from "./render.js";

let currentTaskId = null;

/**
 * Open the modal and populate with task data for editing.
 * @param {Object} task - Task object to edit.
 */
export function openTaskModal(task) {
  const modal = document.getElementById("task-modal");
  const titleInput = document.getElementById("task-title");
  const descInput = document.getElementById("task-desc");
  const statusSelect = document.getElementById("task-status");
  const prioritySelect = document.getElementById("task-priority");
  const submitBtn = document.getElementById("submit-task-btn");
  const deleteBtn = document.getElementById("delete-task-btn");

  // Select modal header
  const modalHeader = document.querySelector("#task-modal .modal-header h3");

  if (task) {
    // Editing existing task
    titleInput.value = task.title;
    descInput.value = task.description;
    statusSelect.value = task.status;
    prioritySelect.value = task.priority || "low";
    submitBtn.textContent = "Save changes";
    modalHeader.textContent = "Task";  // header changes for update
    deleteBtn.style.display = "block";
    currentTaskId = task.id;
  } else {
    // Adding new task
    titleInput.value = "";
    descInput.value = "";
    statusSelect.value = "todo";
    prioritySelect.value = localStorage.getItem("taskPriority") || "low";
    submitBtn.textContent = "Create Task";
    modalHeader.textContent = "Add New Task"; // header for new task
    deleteBtn.style.display = "none";
    currentTaskId = null;
  }

  modal.showModal();
}

/**
 * Set up modal close event.
 */
export function setupModalCloseHandler() {
  const modal = document.getElementById("task-modal");
  const closeBtn = document.getElementById("close-modal-btn");
  closeBtn.addEventListener("click", () => modal.close());
}

/**
 * Set up modal and form submission logic for adding a new task.
 */
export function setupAddTaskModal() {
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskForm = document.getElementById("task-form");
  const deleteBtn = document.getElementById("delete-task-btn");
  const modal = document.getElementById("task-modal");
  const modalHeader = document.getElementById("modal-header-title");
  const prioritySelect = document.getElementById("task-priority");

  // Load saved priority on page load
  window.addEventListener("DOMContentLoaded", () => {
    const savedPriority = localStorage.getItem("taskPriority");
    if (savedPriority) prioritySelect.value = savedPriority;
  });

  // Save priority whenever it changes
  prioritySelect.addEventListener("change", () => {
    localStorage.setItem("taskPriority", prioritySelect.value);
  });

  // Open Add Task modal
  addTaskBtn.addEventListener("click", () => {
    currentTaskId = null;
    taskForm.reset();

    document.getElementById("task-title").value = "";
    document.getElementById("task-desc").value = "";
    document.getElementById("task-status").value = "todo";
    const savedPriority = localStorage.getItem("taskPriority");
    prioritySelect.value = savedPriority || "low";

    const submitBtn = document.getElementById("submit-task-btn");
    if (submitBtn) submitBtn.textContent = "Create Task";
    if (modalHeader) modalHeader.textContent = "Create New Task"; // Header text updated

    if (deleteBtn) deleteBtn.style.display = "none";

    modal.showModal();
  });

  // Delete task
  deleteBtn.addEventListener("click", () => {
    if (!currentTaskId) return;

    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    deleteTask(currentTaskId);

    modal.close();
    clearExistingTasks();
    renderTasks(loadTasks());
    currentTaskId = null;
  });

  // Submit form (create or update task)
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("task-title").value.trim();
    const description = document.getElementById("task-desc").value.trim();
    const status = document.getElementById("task-status").value;
    const priority = document.getElementById("task-priority").value;

    if (!title || !status) return;

    const tasks = loadTasks();

    if (currentTaskId !== null) {
      // Update existing task
      const taskIndex = tasks.findIndex((t) => t.id === currentTaskId);
      if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], title, description, status, priority };
      }
    } else {
      // Create new task
      const newTask = {
        id: Date.now(),
        title,
        description,
        status,
        priority,
      };
      tasks.push(newTask);
    }

    saveTasks(tasks);
    clearExistingTasks();
    renderTasks(loadTasks());
    modal.close();
    currentTaskId = null;
  });
}

