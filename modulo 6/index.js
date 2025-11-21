// Array de objetos Task em memória: { id: string, description: string, completed: boolean, timestamp: number }
let tasks = [];

function generateUniqueId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function renderTasks() {
  const tasksListElement = document.getElementById("tasks-list");
  tasksListElement.innerHTML = "";

  if (tasks.length === 0) {
    tasksListElement.innerHTML = `<p class="empty-list-message">Nenhuma tarefa adicionada ainda!</p>`;
    return;
  }

  // Ordena: não concluídas primeiro
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return a.timestamp - b.timestamp;
  });

  sortedTasks.forEach((task) => {
    const isCompleted = task.completed;
    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${isCompleted ? "completed" : ""}`;

    // Conteúdo da tarefa (checkbox e descrição)
    const taskContent = document.createElement("label");
    taskContent.className = "task-content";
    taskContent.setAttribute("for", `checkbox-${task.id}`);

    taskContent.innerHTML = `
                    <input
                        type="checkbox"
                        id="checkbox-${task.id}"
                        ${isCompleted ? "checked" : ""}
                        onchange="toggleTaskStatus('${task.id}')"
                    >
                    <span class="task-description">${task.description}</span>
                `;

    // Botão de deletar (usando SVG simples para o ícone)
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.setAttribute("onclick", `deleteTask('${task.id}')`);
    deleteButton.setAttribute("title", "Excluir Tarefa");

    deleteButton.innerHTML = `
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                `;

    taskItem.appendChild(taskContent);
    taskItem.appendChild(deleteButton);
    tasksListElement.appendChild(taskItem);
  });
}

window.addTask = function () {
  const inputElement = document.getElementById("task-input");
  const description = inputElement.value.trim();

  if (!description) return;

  const newTask = {
    id: generateUniqueId(),
    description: description,
    completed: false,
    timestamp: Date.now(),
  };

  tasks.push(newTask);
  inputElement.value = "";
  renderTasks();
};

window.toggleTaskStatus = function (taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
};

window.deleteTask = function (taskId) {
  tasks = tasks.filter((t) => t.id !== taskId);
  renderTasks();
};

window.onload = renderTasks;
