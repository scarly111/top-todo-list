// Basic factory function for creating todo
function createTodo({ title, description, dueDate, priority = 'medium', notes = '', checklist = [] }) {
    return {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        completed: false,
        notes,
        checklist,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
}

export default createTodo;