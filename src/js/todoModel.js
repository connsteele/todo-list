// Purpose: Control logic of todo items
import { format } from "date-fns" 

// Format a given date to a more readable format
function formatDate(date) {
    return format(date,  "yyyy-mm-dd");
}

// Factory function for todoLogic model
function createTodoModel(inTitle) {
    let title = inTitle;
    let info = "";
    let priority = undefined; // 0 to 5
    let dateCreated = formatDate(new Date());
    let dateDue = undefined;
    let tags = {};

    
    return {
        title,
        info,
        priority,
        dateCreated,
        dateDue,
        tags,
        formatDate
    }
}

export { createTodoModel };