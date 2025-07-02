// Purpose: Control logic of todo items
import { format } from "date-fns" 

// Format a given date to a more readable format
function formatDate(date) {
    return format(date,  "MMM dd, yyyy");
}

// Factory function for todoLogic model
function createTodoModel(title) {
    let info = "Write here...";
    let id = undefined; // base off project name and array position?
    let priority = 0; // 0 to 5
    let dateCreated = formatDate(new Date());
    let dateDue = undefined;
    let tags = {};

    
    return {
        title,
        id,
        info,
        priority,
        dateCreated,
        dateDue,
        tags,
    }
}

export { createTodoModel };