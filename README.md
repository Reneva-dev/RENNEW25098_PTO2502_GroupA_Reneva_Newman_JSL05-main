# My Kanban Board

🚀 **Live App:** [https://my-kanban-app.netlify.app](https://my-kanban-app.netlify.app)

🎥 Presentation Video

You can watch the project presentation here.

A dynamic and responsive web-based task management tool inspired by the Kanban methodology. This project allows users to visually organize their tasks across three progress states: **To Do**, **Doing**, and **Done** — enabling a clear overview of productivity in real-time.

---

## 📝 Description/Overview

**My Kanban Board** is a modern, user-friendly task management app built with simplicity, usability, and responsiveness in mind. It allows users to seamlessly **add, edit, delete, and categorize tasks** using an intuitive drag-and-drop-like interface. Tasks can be assigned **priorities**, making it easy to focus on high-impact items, and the design is fully **mobile-friendly** while maintaining a clean, accessible desktop experience.

The app supports **dynamic API rendering**, fetching tasks in real-time and handling loading and error states gracefully. Users can also switch between **dark and light modes**, with their preferences saved across sessions for a consistent experience.

Inspired by modern UI/UX principles and a Figma design system, this project is perfect for **individual productivity** or as a foundation for expanding into a **multi-user task management platform**. It combines practical functionality with a polished, responsive interface to make task management simple, efficient, and visually appealing.


## ⚙️ Technologies Used

- **HTML5** – Semantic structure and accessibility
- **CSS3** – Custom styling with responsive design
- **JavaScript (ES6+)** – Interactive functionality and logic
- **LocalStorage API** – Persistent task data across sessions
- **Google Fonts** – Plus Jakarta Sans typography
- **Figma** (design reference)

---

## 🚀 Features

- ✅ Add new tasks via a modal form
- ✅ Edit existing tasks with pre-filled modal data
- ✅ Categorize tasks into **To Do**, **Doing**, and **Done**
- ✅ Delete tasks (optional via edit mode)
- ✅ Responsive layout with mobile and desktop views
- ✅ LocalStorage support for data persistence
- ✅ Adaptive button behavior:
  - On desktop: `+ Add New Task`
  - On mobile: circular "+" button only
- ✅ Modal with form validation and custom error prompts
- ✅ Close modal with a red “X” button
- ✅ Clear, accessible UI with hover states and intuitive design
- ✅ **API Rendering**: Fetch tasks dynamically from an API with graceful loading and error handling
- ✅ **Dark/Light Mode**: Switch between dark and light themes, with preferences saved across sessions
- ✅ **Priority Ranking**: Rank tasks by importance, with visual indicators for high-priority items


---

## 🆕 Recent Updates

- ✨ **Add New Task Modal**  
  - Seamlessly create new tasks via a modal popup.  
  - Includes input fields for **title**, **description**, and **status**.  
  - Form validation ensures all required fields are completed.  
  - Tasks update in real-time and persist in **local storage**.

- 🌐 **API Rendering**  
  - Tasks are dynamically fetched from an **API**.  
  - Handles **loading states** and **errors** gracefully.  
  - Provides a smooth, real-time user experience.

- 🌙☀️ **Dark/Light Mode**  
  - Toggle between **dark** and **light** themes.  
  - User preferences are saved for a consistent experience across sessions.

- 🔝 **Priority Ranking**  
  - Rank tasks by **importance**.  
  - Visual indicators make high-priority tasks easy to identify.

- 📝🗑️ **Task Editing & Deletion**  
  - Edit task details directly from the interface.  
  - Delete tasks easily with instant UI updates.  
  - All changes are persisted for continuity.


## 📦 Setup Instructions

To run this project locally:

1. **Clone this repository**  
   ```bash
   git clone https://github.com/yourusername/my-kanban-board.git
   ```

2. **Navigate to the project folder**  
   ```bash
   cd my-kanban-board
   ```

3. **Open the project in your browser**  
   Open `index.html` directly in your browser, or use Live Server (VSCode extension) for automatic refresh on changes.

> ✅ No build tools or dependencies required.

---

## 💡 Usage Example

1. ✨ Click **“+ Add New Task”** (desktop) or the circular `+` button (mobile) to open the task creation modal.  
   - Modal includes fields for **Title**, **Description**, **Status**, and **Priority Ranking**.  
   - Form validation ensures all required fields are filled, with custom error prompts.

2. 📝 Fill in the **Title**, **Description**, select a **Status**, and optionally set **Priority**.  

3. ✅ Click **“Create Task”** — your task appears in the appropriate column (**To Do**, **Doing**, **Done**).  
   - Tasks are stored in **LocalStorage** or fetched dynamically via the **API** if enabled.  

4. ✏️ Click a task to **edit** its details or **reassign** it to a different status.  
   - Changes are reflected instantly and persisted.  
   - Tasks can also be **deleted** via the edit interface.  

5. 🌙☀️ Toggle between **Dark/Light Mode** using the theme switch for a comfortable viewing experience.  

6. 📱 On mobile, use the circular `+` button to access the same modal and features seamlessly.  


---

## 📱 Interaction Notes

- 📐 **Mobile View:**  
  - Header text is hidden and replaced by a compact layout.  
  - The Add Task button becomes a floating circular "+" icon.  

- 🔑 **Modal Accessibility:**  
  - Tasks can be dismissed or saved via **keyboard** or **mouse**.  
  - Form includes **validation**: empty Title or Description fields trigger a red exclamation prompt.  
  - Supports setting **task priority** within the modal.  

- 🌐 **API Rendering:**  
  - Tasks fetched from the API update dynamically with loading and error states handled gracefully.  

- 🌙☀️ **Dark/Light Mode:**  
  - Theme can be toggled at any time, maintaining user preference across sessions.  

- 📝 **Task Editing & Deletion:**  
  - Tasks can be edited or deleted directly from the UI, with changes reflected instantly.  


## 🧑‍💻 Author

Developed by Reneva Newman 
© 2025 – All rights reserved.
