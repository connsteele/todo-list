// Purpose: Control logic of todo items
import { format } from "date-fns" 

// Format a given date to a more readable format
function formatDate(date) {
    return format(date,  "MMM dd, yyyy");
}

// Factory function for todoLogic model
function createTodoLogic(title) {
    let info = "";
    let priority = 0; // 0 to 5
    let project = undefined;
    let dateCreated = formatDate(new Date());
    let dateDue = undefined;
    let status = undefined;
    let tags = {};

    
    return {
        title,
        info,
        priority,
        project,
        dateCreated,
        dateDue,
        status,
        tags,
    }
}

export { createTodoLogic };