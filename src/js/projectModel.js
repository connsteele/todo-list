// Purpose: Logic and data storage for a project

import { createTodoCollection } from "./todoCollection";

// Create an object containing the data and logic for a project
function createProjectModel(name, emitter) {
    let projName = name;
    let projEmitter = emitter;
    let todos = createTodoCollection();

    // Ask the collection to add a new item to the end and emit a message
    function addItem(name=undefined) {
        const item = todos.pushItem(name, projName);
        projEmitter.emit("todoAdd", {item, todos});
    }

    // Update a specific item in the array
    const updateTodoItem = (obj) => {
        todos.updateEntry(obj);
    }


    return {
        name,
        todos,
        addItem,
        updateTodoItem
    }
}

export { createProjectModel }