import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";

//--- General Setup
let counter = 0;

//--- Event setup for project creation
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "btn-create") {
        let emitter = mitt();
        const inputName = document.querySelector("#project-name");
        let projectName = inputName.value !== "" ? inputName.value : `Project ${counter++}`;
        let model = createProjectModel(projectName, emitter);
        let view = createProjectView(projectName);
        let controller = createProjectController(model, view, emitter);
    }
});