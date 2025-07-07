import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";
import { createPortfolio } from "./js/portfolio";

//--- General Setup
let counter = 0;

//--- Portfoilio 
let portfolio = createPortfolio();
//--- Event setup for project creation
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "project-create") {
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
    else if (target.id === "portfolio-new") {
        portfolio = createPortfolio();
        const projectDiv = document.querySelector("#projects");
        while(projectDiv.firstChild) {
            projectDiv.removeChild(projectDiv.firstChild);
        }
        counter = 0;

    }
    else if (target.id === "portfolio-save") {
        console.log("Saving portfolio");
    }
    else if (target.id === "portfolio-load") {
        console.log("Loading portfolio");
    }

});