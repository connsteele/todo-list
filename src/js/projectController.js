// Purpose: Coordinate project model and project view
// Subscribe to the project model and then an update is recieved notify view to update

import { createProjectModel } from "./projectModel";
import { createProjectView } from "./projectView";

function createProjectController(model, view, emitter) {
    let projModel = model;
    let projView = view;
    let projEmitter = emitter;

    // Subscribe the emitter to relevant message from the model
    const subEmitter = () => {
        // New item added to todo
        projEmitter.on("todoAdd", (e) => {
            console.log("New item added to collection", e);

            projView.render(projModel.todos.getMap());
        });
    }

    // Callback for updates to card UI interaction, dispatch changes to model
    const updateCard = (viewItem) => {
        projModel.updateTodoItem(viewItem);
    }

    // Callback for click interactions with card, dispatch changes to model
    const cardClick = (viewItem) => {
        if (viewItem.status === "toggle") {
            projModel.updateTodoItem(viewItem);
        }
    }

    // Callback for new card created in UI, tell the model it needs a new item
    const createItem = () => {
        projModel.addItem();
    }
    

    //----------------------- Logic on creation -----------------------
    subEmitter();
    view.bindupdateCardInfo(updateCard);
    view.bindCreateItem(createItem);
    view.bindClickHandler(cardClick);

    return {
    }
    
}

export {createProjectController};