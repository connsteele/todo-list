// Purpose: Logic and data storage for a project

import { createTodoCollection } from "./todoCollection";

// Create an object containing the data and logic for a project
function createProjectModel(name, emitter) {
    let projName = name;
    let projEmitter = emitter;
    let todos = createTodoCollection();

    // Ask the collection to add a new item to the end and emit a message
    function addItem(name="") {
        const item = todos.pushItem(name);
        projEmitter.emit("todoAdd", {item, todos});
    }


    return {
        name,
        todos,
        addItem,
    }
}

export { createProjectModel }