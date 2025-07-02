import "./css/style.css";
import mitt from "mitt";
import { createProjectModel } from "./js/projectModel";
import { createProjectView } from "./js/projectView";
import { createProjectController } from "./js/projectController";

//--- General Setup
let emitter = mitt();
let model = createProjectModel("test", emitter);
let view = createProjectView("Project 1");
let controller = createProjectController(model, view, emitter);

