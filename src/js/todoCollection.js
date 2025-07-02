import { createTodoModel } from "./todoModel";

function createTodoCollection () {
    let models = [];

    // Push a new item to the end of the list and return it
    function pushItem(name="") {
        const item = createTodoModel(name);
        models.push(item);
        return item;
    }

    return {
        models,
        pushItem,
    }
}

export { createTodoCollection }