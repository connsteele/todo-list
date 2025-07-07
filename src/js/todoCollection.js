import { createTodoModel } from "./todoModel";

const createTodoCollection = (load=undefined) => {

    // Create and insert a new item into a collection
    const createItem = (itemName="") => {
        const id = crypto.randomUUID();
        const item = createTodoModel(itemName);
        modelMap.set(id, item);
        return item;
    }

    // Create an item from existing data
    const loadItem = (id, data) => {
        const item = createTodoModel(data.title);
        // set item attributes
        item.info = data.info;
        item.done = data.done;
        item.priority = data.priority;
        item.created = data.created;
        item.due = data.due;
        item.tags = data.tags;

        // Add to the map
        modelMap.set(id, item);
    }

    // Delete an item from the internal map given a key
    const deleteItem = (key) => {
        modelMap.delete(key);
    }

    // Return an item from the model map
    const getItem = (id) => modelMap.get(id);

    // Return a copy of the model map so the source cannot be directly modified
    const getMap = () =>  {
        const copyMap = modelMap;
        return copyMap;
    }

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
        if (edited.due && edited.due !== item.due ) {
            item.due = edited.due;
        }
        if (edited.status) {
            item.done = !item.done;
        }
    }


    const toJSON = () => {
        return {
            map: Object.fromEntries(modelMap),
        }
    }
    

    //-------------------- Variables and logic --------------------
    let modelMap = new Map();;
    let count = 1;
    if (load) {
        const loadTodos = load.todos.map;
        Object.entries(loadTodos).forEach(([key, data]) => {
            // Create a new item for each then add it to the map
            const todo = loadItem(key, data);
        });
        
    }


    return {
        createItem,
        length,
        getItem,
        getMap,
        deleteItem,
        updateEntry,
        toJSON
    }
}

export { createTodoCollection }