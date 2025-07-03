import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";

//--- General Setup
let emitter = mitt();
let projectName = "Test Project"
let model = createProjectModel(projectName, emitter);
let view = createProjectView(projectName);
let controller = createProjectController(model, view, emitter);

