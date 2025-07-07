// Purpose: Logic and data storage for a project

import { createTodoCollection } from "./todoCollection";

// Create an object containing the data and logic for a project
function createProjectModel(name, emitter) {
    let projName = name;
    let projEmitter = emitter;
    let todos = createTodoCollection();

    // Ask the collection to add a new item to the end and emit a message
    function addItem(project, name=undefined) {
        if (project === projName) {
            const item = todos.createItem(name, projName);
            projEmitter.emit("render", {item, todos});
        }
    }

    // Ask the collection to remove an item by key and emit a message
    function removeItem(item){
        if (item.project === projName) {
            todos.deleteItem(item.id);
            projEmitter.emit("render", `${item.id} was deleted`);
        }
    }

    // Update a specific item in the array
    const updateTodoItem = (viewItem) => {
        if (viewItem.project === projName) {
            todos.updateEntry(viewItem, viewItem.id);
        }
    }


    return {
        name,
        todos,
        addItem,
        removeItem,
        updateTodoItem
    }
}

export { createProjectModel }