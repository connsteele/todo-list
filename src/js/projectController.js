// Purpose: Coordinate project model and project view
// Subscribe to the project model and then an update is recieved notify view to update

import { createProjectModel } from "./projectModel";
import { createProjectView } from "./projectView";

function createProjectController(model, view, emitter) {
    let projModel = model;
    let projView = view;
    let projEmitter = emitter;
    subEmitter();

    // Subscribe the emitter to relevant message from the model
    function subEmitter() {
        // New item added to todo
        projEmitter.on("todoAdd", (e) => {
            console.log("New item added to the array", e);
            projView.update(projModel.todos.models);
        });
    }

    // Add a view to the project controller
    function addView(view) {
        
    }

    return {
        addView
    }
}

export {createProjectController};