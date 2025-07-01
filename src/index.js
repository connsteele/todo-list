import "./css/style.css";
import { createTodoController } from "./js/todoController.js";

//--- General Setup
let controller = createTodoController();
let itemCounter = 1;


//--- Setup events
const btnCreateItem = document.querySelector("#btnCreateItem");
document.addEventListener("click", (e) => {
    switch(e.target)
    {
        case btnCreateItem:
            controller.addTodo(`Item ${itemCounter++}`);
            console.log(controller.items);
            break;
        default:
            // Nothing
    }
});