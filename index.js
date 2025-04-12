// Main
import {
    addTodoToProject,
    createNewProject,
    getAllProjects,
    getTodosByProjectId,
    removeTodo,
    toggleTodoComplete
} from './todoManager.js';

let currentProjectId = null;

function renderProjects() {
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
        projectEl.appendChild(nameSpan);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '🗑️';
        deleteBtn.classList.add('project-delete');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteProject(project.id);
        });
        projectEl.appendChild(deleteBtn);

        projectEl.addEventListener('click', () => {
            currentProjectId = project.id;
            renderProjects();
            renderTodos();
        });

        projectList.appendChild(projectEl);
    });
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const todos = getTodosByProjectId(currentProjectId);

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
            toggleTodoComplete(todo.id, currentProjectId);
            renderTodos();
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
            removeTodo(todo.id, currentProjectId);
            renderTodos();
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

function deleteProject(projectId) {
    const index = getAllProjects().findIndex(p => p.id === projectId);
    if (index > -1) {
        getAllProjects().splice(index, 1);
        if (currentProjectId === projectId) {
            currentProjectId = getAllProjects()[0]?.id || null;
        }
        renderProjects();
        renderTodos();
    }
}

function setupEventListeners() {
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const input = document.getElementById('new-project-name');
        const name = input.value.trim();
        if (name) {
            const project = createNewProject(name);
            currentProjectId = project.id;
            input.value = '';
            renderProjects();
            renderTodos();
        }
    });

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        const title = document.getElementById('todo-title').value.trim();
        const description = document.getElementById('todo-desc').value.trim();
        const dueDate = document.getElementById('todo-date').value;
        const priority = document.getElementById('todo-priority').value;

        if (title && dueDate) {
            addTodoToProject({ title, description, dueDate, priority }, currentProjectId);
            renderTodos();

            document.getElementById('todo-title').value = '';
            document.getElementById('todo-desc').value = '';
            document.getElementById('todo-date').value = '';
        }
    });
}

function init() {
    const defaultProject = getAllProjects()[0];
    currentProjectId = defaultProject.id;
    setupEventListeners();
    renderProjects();
    renderTodos();
}

init();
