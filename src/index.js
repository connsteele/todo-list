import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";

//--- General Setup
let emitter = mitt();
let model = createProjectModel("test", emitter);
let view = createProjectView();
let controller = createProjectController(model, view, emitter);
let itemCounter = 1;


//--- Setup events
const btnCreateItem = document.querySelector("#btnCreateItem");
document.addEventListener("click", (e) => {
    switch(e.target)
    {
        case btnCreateItem:
            model.addItem(`Item ${itemCounter++}`);
            break;
        default:
            // Nothing
    }
});