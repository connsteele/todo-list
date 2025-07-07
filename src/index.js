import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";
import { createPortfolio } from "./js/portfolio";
import { parse } from "date-fns";

//--- Functions
const storageAvailable = (type) => {
    let storage;
    try {
        storage = window[type];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

//--- General Setup
let counter = 0;

//--- Portfoilio 
let portfolio = createPortfolio("portfolio");
//--- Event setup for project creation
document.addEventListener("click", (e) => {
    const target = e.target;
    if (target.id === "project-create") {
        const emitter = mitt();

        // Project Creation
        const inputName = document.querySelector("#project-name");
        const projectName = inputName.value !== "" ? inputName.value : `Project ${counter++}`;
        if (portfolio.hasKey(projectName)) {
            alert(`A project with the name: "${projectName}" already exists in portfolio.`);
            return;
        }
        const model = createProjectModel(projectName, emitter);
        const view = createProjectView(projectName);
        const controller = createProjectController(model, view, emitter);
        portfolio.addProject(projectName, model);
        portfolio.printProjects();
    }
    else if (target.id === "portfolio-new") {
        portfolio = createPortfolio("portfolio");
        const projectDiv = document.querySelector("#projects");
        while(projectDiv.firstChild) {
            projectDiv.removeChild(projectDiv.firstChild);
        }
        counter = 0;
        
        // Clear local storage
        if (storageAvailable("localStorage")) {
            console.log("localStorage has been cleared");
            localStorage.clear()
        }
        else {
            // Not available
            return;
        }

    }
    else if (target.id === "portfolio-save") {
        console.log("Saving portfolio");
        // Check if local storage is available
        if (storageAvailable("localStorage")) {
            console.log("localStorage is usable");
            localStorage.clear()
            localStorage.setItem("portfolio", JSON.stringify(portfolio.toJSON()));
            console.log(localStorage);
        }
        else {
            // Not available
            return;
        }
    }
    else if (target.id === "portfolio-load") {
        console.log("Loading portfolio");
        // Destringify and load portfolio, projects and todo items from localStorage
        if (storageAvailable("localStorage")) {
            console.log("Loading from localStorage");
            // Clear the page
            const projectDiv = document.querySelector("#projects");
            while(projectDiv.firstChild) {
                projectDiv.removeChild(projectDiv.firstChild);
            }
            
            let portfolioName = "portfolio";
            const localPortfolio = localStorage.getItem(portfolioName);
            if (localPortfolio) {
                const localData = JSON.parse(localPortfolio);
                // Create a portfolio from localStorage
                let newPortfolio = createPortfolio(localData.name);
                Object.keys(localData.projects).forEach(projName => {
                    const emitter = mitt();
                    const projData = localData.projects[projName];
                    // Setup the MVC
                    const project = createProjectModel(projName, emitter);
                    const view = createProjectView(projName);
                    const controller = createProjectController(project, view, emitter);
                    // Add data into project and emit after it has been associated with the controller
                    project.addTodos(projData);
                    
                    // Add the project to the portfolio
                    newPortfolio.addProject(projName, project);
                });
                // Add projects

            }
            else {
                console.error("No portfolio with the given name can be found");
            }

        }
        else {
            // Not available
            console.log("localStorage is not available");
            return;
        }
    }

    
});