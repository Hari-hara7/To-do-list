let tasks = [];

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
        const task = {
            id: Date.now(),
            text: taskText,
            priority: false,
            dueDate: null,
            category: null,
        };

        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

function togglePriority(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.priority = !task.priority;
        }
        return task;
    });
    renderTasks();
}

function editTask(id) {
    const newTaskText = prompt('Edit task:', tasks.find(task => task.id === id).text);

    if (newTaskText !== null) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.text = newTaskText;
            }
            return task;
        });
        renderTasks();
    }
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const taskText = document.createElement('div');
        taskText.textContent = task.text;

        const taskActions = document.createElement('div');
        taskActions.className = 'task-actions';

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(task.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(task.id);

        const priorityButton = document.createElement('button');
        priorityButton.textContent = task.priority ? 'Unprioritize' : 'Prioritize';
        priorityButton.onclick = () => togglePriority(task.id);

        taskActions.appendChild(deleteButton);
        taskActions.appendChild(editButton);
        taskActions.appendChild(priorityButton);

        taskElement.appendChild(taskText);
        taskElement.appendChild(taskActions);

        taskList.appendChild(taskElement);
    });
}

// Initial rendering
renderTasks();
