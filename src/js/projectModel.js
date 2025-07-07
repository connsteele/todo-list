// Purpose: Logic and data storage for a project

import { createTodoCollection } from "./todoCollection";

// Create an object containing the data and logic for a project
const createProjectModel = (name, emitter) => {
    let projName = name;
    let projEmitter = emitter;
    let todos = createTodoCollection();

    // Ask the collection to add a new item to the end and emit a message
    const addItem = (project, name=undefined) => {
        if (project === projName) {
            const item = todos.createItem(name);
            projEmitter.emit("render", {item, todos});
        }
    }

    // Add an exisiting todo object and convert it to an internal map
    const addTodos = (projData) => {
        todos = createTodoCollection(projData);
        projEmitter.emit("render", {"Loaded todos": todos});
    }

    // Ask the collection to remove an item by key and emit a message
    const removeItem = (item) => {
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


    const toJSON = () => {
        return {
            name: projName,
            todos: todos.toJSON(),
        }
    }


    return {
        //getter & setter
        get todos() {return todos},
        set todos(inTodos) {todos = inTodos}, 
        name,
        addTodos,
        addItem,
        removeItem,
        updateTodoItem,
        toJSON
    }
}

export { createProjectModel }