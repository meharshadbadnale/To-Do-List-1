document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText) {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.textContent = taskText;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskItem.onclick = () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        };

        taskInput.value = '';
        saveTasks();
    }
}

function saveTasks() {
    const tasks = [];
    const taskList = document.getElementById('taskList').children;

    for (const taskItem of taskList) {
        tasks.push({
            text: taskItem.firstChild.textContent,
            completed: taskItem.classList.contains('completed')
        });
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    for (const task of tasks) {
        const taskList = document.getElementById('taskList');
        const taskItem = document.createElement('li');
        taskItem.textContent = task.text;

        if (task.completed) {
            taskItem.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);

        taskItem.onclick = () => {
            taskItem.classList.toggle('completed');
            saveTasks();
        };
    }
}
