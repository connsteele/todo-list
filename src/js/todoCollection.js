import { createTodoModel } from "./todoModel";

function createTodoCollection () {

    // Create and insert a new item into a collection
    const createItem = (itemName="", projectName) => {
        const id = `${projectName}[${count++}]`;
        const item = createTodoModel(itemName, id);
        modelMap.set(id, item);
        return item;
    }

    // Return an item from the model map
    const getItem = (id) => modelMap.get(id);

    // Return the model map (probably hide this more when you have time)
    const getMap = () => modelMap;

    // Return the length of the internal model array
    const length = () => models.length;

    // Update a specific item in models specific by its ID
    const updateEntry = (edited, key) => {
        const item = modelMap.get(key);
        if (item === undefined) {
            console.error("todoCollection: No model paired with key");
            return;
        }

        // Update model attributes that have been edited in the UI
        if (edited.info && edited.info !== item.info) {
            item.info = edited.info;
        }
        if (edited.title && edited.title !== item.title) {
            item.title = edited.title;
        }
        if (edited.priority && edited.priority !== item.priority) {
            item.priority = edited.priority;
        }
        if (edited.dueDate && edited.dueDate !== item.dateDue ) {
            item.dateDue = edited.dueDate;
        }
    }
    

    //-------------------- Variables and logic --------------------
    let modelMap = new Map();
    let count = 1; // used to create unique ids for models

    return {
        createItem,
        length,
        getItem,
        getMap,
        updateEntry
    }
}

export { createTodoCollection }