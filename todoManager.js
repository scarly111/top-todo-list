// todo manager
import createTodo from './todo.js';
import { createProject } from './project.js';

const projects = [createProject('Default')];

function addTodoToProject(todoData, projectId) {
    const todo = createTodo(todoData);
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.todos.push(todo);
    }
}

function deleteTodoFromProject(todoId, projectId) {
    const project = projects.find(p => p.id === projectId);
    if (project) {
        project.todos = project.todos.filter(todo => todo.id !== todoId);
    }
}