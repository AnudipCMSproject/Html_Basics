const taskInput = document.getElementById('task-input');
const taskList = document.querySelector('.task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const   
 taskElement = document.createElement('li');
    taskElement.classList.add('task-item');   

    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''}>
      <span class="task-text">${task.text}</span>
      <button class="edit-btn">&#999b;</button>
      <button class="delete-btn">&#10006;</button>
    `;

    // Event listeners for checkbox, edit, and delete buttons
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const editButton = taskElement.querySelector('.edit-btn');
    const deleteButton = taskElement.querySelector('.delete-btn');
    const taskTextElement = taskElement.querySelector('.task-text');

    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));   

    });

    editButton.addEventListener('click', () => {
      const newText = prompt('Edit task:', task.text);
      if (newText) {
        tasks[index].text = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      }
    });

    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
    });

    taskList.appendChild(taskElement);   

  });
}

taskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      const newTask = { text: taskText, completed: false };
      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      taskInput.value = '';
      renderTasks();
    }
  }
});

renderTasks();