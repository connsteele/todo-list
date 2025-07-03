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
            console.log("New item added to the array", e);
            projView.render(projModel.todos.models);
        });
    }

    // Callback for updates to card U/I interaction, dispatch changes to model
    const updateCardInfo = (id, info) => {
        model.updateTodoItem(id, info);
    }

    // Create a todo item
    const createItem = () => {
        projModel.addItem();
    }

    //----------------------- Logic on creation -----------------------
    subEmitter();
    view.bindupdateCardInfo(updateCardInfo);
    view.bindCreateItem(createItem);

    return {
    }
    
}

export {createProjectController};