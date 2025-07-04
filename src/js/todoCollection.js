import { createTodoModel } from "./todoModel";

function createTodoCollection () {
    // Push a new item to the end of the list and return it
    const pushItem = (name="", project) => {
        const id = `${project}[${length()}]`;
        const item = createTodoModel(name, id);
        models.push(item);
        return item;
    }

    // Return the length of the internal model array
    const length = () => models.length;

    // Update a specific item in models specific by its ID
    const updateEntry = (edited) => {
        const item = models.find(model => model.id === edited.id);
        if (!item) {
            console.error("todoCollection: No model matches id");
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
    }
    

    //-------------------- Variables and logic --------------------
    let models = [];

    return {
        models,
        pushItem,
        length,
        updateEntry
    }
}

export { createTodoCollection }