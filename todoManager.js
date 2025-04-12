// todo manager
function createTodo({ title, description, dueDate, priority = 'medium' }) {
    return {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

function createProject(name) {
    return {
        id: Date.now().toString(),
        name,
        todos: [],
    };
}

let projects = loadProjects();

function loadProjects() {
    const data = localStorage.getItem('projects');
    if (data) return JSON.parse(data);
    return [createProject('Main')];
}

function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function getAllProjects() {
    return projects;
}

function getProjectById(projectId) {
    return projects.find(p => p.id === projectId);
}

function createNewProject(name) {
    const newProject = createProject(name);
    projects.push(newProject);
    saveProjects();
    return newProject;
}

function addTodoToProject(todoData, projectId) {
    const project = getProjectById(projectId);
    if (!project) return;
    const todo = createTodo(todoData);
    project.todos.push(todo);
    saveProjects();
}

function getTodosByProjectId(projectId) {
    const project = getProjectById(projectId);
    return project ? project.todos : [];
}

function removeTodo(todoId, projectId) {
    const project = getProjectById(projectId);
    if (project) {
        project.todos = project.todos.filter(todo => todo.id !== todoId);
        saveProjects();
    }
}

function toggleTodoComplete(todoId, projectId) {
    const project = getProjectById(projectId);
    if (project) {
        const todo = project.todos.find(t => t.id === todoId);
        if (todo) {
            todo.completed = !todo.completed;
            todo.updatedAt = new Date();
            saveProjects();
        }
    }
}

function deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
    saveProjects();
}

export {
    createNewProject,
    getAllProjects,
    addTodoToProject,
    getTodosByProjectId,
    removeTodo,
    toggleTodoComplete,
    deleteProject
};
