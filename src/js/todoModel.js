// Purpose: Control logic of todo items
import { format } from "date-fns" 

// Format a given date to a more readable format
const formatDate = (date) => {
    return format(date,  "yyyy-mm-dd");
}

// Factory function for todoLogic model
const createTodoModel = (inTitle) => {
    let title = inTitle;
    let info = "";
    let done = false;
    let priority = undefined; // 0 to 5
    let created = formatDate(new Date());
    let due = undefined;
    let tags = {};

    
    const toJSON = () => {
        return {
            _title: title,
            _info: info,
            _done: done,
            _priority: priority,
            _created: created,
            _due: due,
            _tags: tags
        }
    }

    
    return {
        title,
        info,
        priority,
        created,
        due,
        tags,
        done,
        formatDate,
        toJSON
    }
}

export { createTodoModel };