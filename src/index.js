import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";
import { createPortfolio } from "./js/portfolio";

//--- General Setup
let counter = 0;

//--- Portfoilio 
const portfolio = createPortfolio();
//--- Event setup for project creation
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "btn-create") {
        let emitter = mitt();

        // Project Creation
        const inputName = document.querySelector("#project-name");
        const projectName = inputName.value !== "" ? inputName.value : `Project ${counter++}`;
        if (portfolio.hasKey(projectName)) {
            alert(`A project with the name: "${projectName}" already exists in portfolio.`);
            return;
        }
        const model = createProjectModel(projectName, emitter);
        const view = createProjectView(projectName);
        let controller = createProjectController(model, view, emitter);
        portfolio.addProject(projectName, model);
        portfolio.printProjects();
    }
});