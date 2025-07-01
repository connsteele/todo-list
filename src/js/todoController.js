// Purpose: Coordinage model and view of todo items

import { createTodoLogic } from "./todoLogic.js"
import { createTodoView } from "./todoView.js"

function createTodoController() {
    //--- Variables
    let items = []; // collection of todo items


    //--- Create and add new Todo Model
    function addTodo(title="New Item") {
        const itemModel = createTodoLogic(title);
        const itemView = addTodoView();
        const item = {model: itemModel, view: itemView};
        items.push(item);
    }

    //--- Create and add new Todo View
    function addTodoView() {
        return createTodoView();
    }


    return {
        items,
        addTodo,
    }
}

export { createTodoController }; 