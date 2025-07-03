import { createTodoModel } from "./todoModel";

function createTodoCollection () {
    // Push a new item to the end of the list and return it
    const pushItem = (name="New Item", project) => {
        const id = `${project}[${length()}]`;
        const item = createTodoModel(name, id);
        models.push(item);
        return item;
    }

    // Return the length of the internal model array
    const length = () => models.length;

    // Update a specific item in models specific by its ID
    const updateEntry = (id, info) => {
        const item = models.find(model => model.id === id);
        if (!item) {
            console.error("todoCollection: No model matches id");
            return;
        }

        item.info = info;
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