import {
    getAllProjects,
    getTodosByProjectId,
    removeTodo,
    toggleTodoComplete
} from './todoManager.js';

function renderProjects(currentProjectId, onProjectClick, onDeleteClick) {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    getAllProjects().forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.classList.add('project-item');
        if (project.id === currentProjectId) {
            projectEl.classList.add('active');
        }

        const nameSpan = document.createElement('span');
        nameSpan.textContent = project.name;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('project-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            onDeleteClick(project.id);
        });

        projectEl.appendChild(nameSpan);
        projectEl.appendChild(deleteBtn);
        projectEl.addEventListener('click', () => onProjectClick(project.id));

        projectList.appendChild(projectEl);
    });
}

function renderTodos(projectId) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const todos = getTodosByProjectId(projectId);

    todos.forEach(todo => {
        const todoEl = document.createElement('div');
        todoEl.classList.add('todo-item');
        todoEl.setAttribute('data-priority', todo.priority);

        const header = document.createElement('div');
        header.classList.add('todo-header');

        const checkTitle = document.createElement('div');
        checkTitle.classList.add('todo-check-title');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.classList.add('todo-complete');
        checkbox.addEventListener('change', () => {
            toggleTodoComplete(todo.id, projectId);
            renderTodos(projectId);
        });

        const title = document.createElement('span');
        title.classList.add('todo-title');
        title.textContent = todo.title;
        if (todo.completed) title.style.textDecoration = 'line-through';

        checkTitle.appendChild(checkbox);
        checkTitle.appendChild(title);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('todo-delete');
        deleteBtn.addEventListener('click', () => {
            removeTodo(todo.id, projectId);
            renderTodos(projectId);
        });

        header.appendChild(checkTitle);
        header.appendChild(deleteBtn);

        const due = document.createElement('div');
        due.classList.add('todo-due');
        due.textContent = `Due: ${todo.dueDate}`;

        const desc = document.createElement('div');
        desc.classList.add('todo-desc');
        desc.textContent = todo.description;

        todoEl.appendChild(header);
        todoEl.appendChild(due);
        todoEl.appendChild(desc);

        todoList.appendChild(todoEl);
    });
}

export { renderProjects, renderTodos };