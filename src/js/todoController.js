// Purpose: Coordinage model and view of todo items

import { createTodoLogic } from "./todoLogic.js"
import { createTodoView } from "./todoView.js"

function createTodoController() {
    //--- Variables
    let items = []; // collection of todo items


    //--- Create and add new Todo Model
    function addTodo(title="New Item") {
        const itemModel = createTodoLogic(title);
        const itemView = addTodoView(itemModel);
        // itemView.updateView();
        const item = {model: itemModel, view: itemView};
        items.push(item);
    }

    //--- Create and add new Todo View
    function addTodoView(model) {
        const view = createTodoView(model.title);
        view.init();
        view.updateInfo("Place Holder Text");
        return view;
    }

    //--- Need a fair few functions to update elements of the todo item

    //--- Update todo item information
    function updateInfo() {

    }


    return {
        items,
        addTodo,
    }
}

export { createTodoController }; 