// api.js

/**
 * Fetch tasks from remote API.
 * @returns {Promise<Array<Object>>} List of task objects.
 */
export async function fetchTasksFromAPI() {
  const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5"; // Sample placeholder
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks.");
  }

  const rawData = await response.json();
  return rawData.map((task) => ({
    id: task.id,
    title: task.title,
    description: "Imported task", // Placeholder description
    status: task.completed ? "done" : "todo", // Map to your status model
  }));
}
