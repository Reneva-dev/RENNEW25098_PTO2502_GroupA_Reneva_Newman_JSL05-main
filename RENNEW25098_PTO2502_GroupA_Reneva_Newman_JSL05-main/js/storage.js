// storage.js

const STORAGE_KEY = "kanbanTasks";

/**
 * Load tasks from localStorage.
 * @returns {Array<Object>} Array of task objects.
 */
export function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  } else {
    // Return empty array if no tasks in localStorage
    return [];
  }
}

/**
 * Save the tasks to localStorage.
 * @param {Array<Object>} tasks - Array of task objects.
 */
export function saveTasks(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export function deleteTask(taskId) {
  let tasks = loadTasks();
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasks(tasks);
}

